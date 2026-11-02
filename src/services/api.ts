import type { Crop, DiseaseDetectionResult, Farm, MarketItem, UserProfile } from '../types';

const API_BASE_URL = '/api';

export const getAuthToken = (): string | null => {
  return localStorage.getItem('cropwise_access_token');
};

export const setAuthTokens = (access: string, refresh: string) => {
  localStorage.setItem('cropwise_access_token', access);
  localStorage.setItem('cropwise_refresh_token', refresh);
};

export const clearAuthTokens = () => {
  localStorage.removeItem('cropwise_access_token');
  localStorage.removeItem('cropwise_refresh_token');
};

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Attempt token refresh if available
    const refreshToken = localStorage.getItem('cropwise_refresh_token');
    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: refreshToken }),
        });
        if (refreshRes.ok) {
          const data = await refreshRes.json();
          setAuthTokens(data.access, refreshToken);
          headers.set('Authorization', `Bearer ${data.access}`);
          return fetch(url, { ...options, headers });
        }
      } catch (err) {
        clearAuthTokens();
      }
    }
  }

  return response;
}

// User & Auth APIs
export const apiLogin = async (credentials: any) => {
  const res = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.error || 'Invalid credentials');
  }
  return res.json();
};

export const apiRegister = async (userData: any) => {
  const res = await fetch(`${API_BASE_URL}/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.username?.[0] || 'Registration failed');
  }
  return res.json();
};

export const apiGetProfile = async (): Promise<UserProfile> => {
  const res = await fetchWithAuth(`${API_BASE_URL}/profile/`);
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
};

export const apiUpdateProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  const res = await fetchWithAuth(`${API_BASE_URL}/profile/`, {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
};

// Farms APIs
export const apiGetFarms = async (): Promise<Farm[]> => {
  const res = await fetchWithAuth(`${API_BASE_URL}/farms/`);
  if (!res.ok) throw new Error('Failed to fetch farms');
  return res.json();
};

export const apiCreateFarm = async (farmData: Partial<Farm>): Promise<Farm> => {
  const res = await fetchWithAuth(`${API_BASE_URL}/farms/`, {
    method: 'POST',
    body: JSON.stringify(farmData),
  });
  if (!res.ok) throw new Error('Failed to create farm');
  return res.json();
};

// Disease Detection API
export const apiPredictDisease = async (imageFile: File, selectedCrop?: string): Promise<DiseaseDetectionResult> => {
  const formData = new FormData();
  formData.append('image', imageFile);
  if (selectedCrop) {
    formData.append('crop', selectedCrop);
  }

  const res = await fetchWithAuth(`${API_BASE_URL}/disease/predict/`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.detail || 'Disease prediction failed');
  }

  const data = await res.json();
  return {
    id: data.id?.toString() || `scan-${Date.now()}`,
    date: data.created_at ? new Date(data.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    crop: data.crop || selectedCrop || 'Crop Leaf',
    diseaseName: data.disease_name || data.pathology_label || 'Detected Pathology',
    confidence: data.confidence ? Math.round(data.confidence * 10) / 10 : 92.5,
    severity: data.severity || 'Moderate',
    overview: data.overview || 'AI Pathology scan result.',
    symptoms: data.symptoms || [],
    causes: data.causes || [],
    organicTreatment: data.organic_treatment || data.organicTreatment || [],
    chemicalTreatment: data.chemical_treatment || data.chemicalTreatment || [],
    prevention: data.prevention || [],
    affectedParts: data.affected_parts || data.affectedParts || ['Leaves'],
    leafImageUrl: data.image_url || URL.createObjectURL(imageFile),
    farmName: data.farm_name || 'My Farm',
    bbox: data.bbox || { x: 20, y: 25, width: 60, height: 50 },
  };
};

// Crop Recommendation API
export const apiRecommendCrops = async (params: any): Promise<Crop[]> => {
  const res = await fetchWithAuth(`${API_BASE_URL}/crops/recommend/`, {
    method: 'POST',
    body: JSON.stringify({
      season: params.season,
      soil_type: params.soilType,
      soil_ph: params.soilPh,
      water_availability: params.waterAvailability,
      farm_area: params.farmArea,
    }),
  });

  if (!res.ok) throw new Error('Failed to compute crop recommendations');
  const data = await res.json();
  return data.map((item: any) => ({
    id: item.id?.toString() || item.crop_id || `crop-${Math.random()}`,
    name: item.name || item.crop_name,
    category: item.category || 'Cereal',
    bestSeason: item.best_season || params.season,
    soilType: item.soil_type || params.soilType,
    phRange: item.ph_range || `${params.soilPh - 0.5}-${params.soilPh + 0.5}`,
    waterRequirement: item.water_requirement || params.waterAvailability,
    growthDurationDays: item.growth_duration_days || 120,
    expectedYieldPerAcre: item.expected_yield_per_acre || '25-30 Quintals',
    marketPricePerQtl: item.market_price_per_qtl || 2200,
    priceTrendPercent: item.price_trend_percent || 5.4,
    suitabilityScore: item.suitability_score || item.score || 88,
    whyRecommended: item.why_recommended || item.whyRecommended || 'Optimal match for soil and climate parameters.',
    imageUrl: item.image_url || item.imageUrl || '/assets/paddy_crop_real.jpg',
    description: item.description || 'High-yielding crop suited for your agricultural field.',
    fertilizerDose: item.fertilizer_dose || 'NPK 120:60:40 kg/ha',
    irrigationMethod: item.irrigation_method || 'Drip / Furrow',
    pestRisk: item.pest_risk || 'Low',
  }));
};

// Market Prices API
export const apiGetMarketPrices = async (): Promise<MarketItem[]> => {
  const res = await fetchWithAuth(`${API_BASE_URL}/market/prices/`);
  if (!res.ok) throw new Error('Failed to fetch market prices');
  return res.json();
};

export const apiPredictPrice = async (commodity: string, mandi: string) => {
  const res = await fetchWithAuth(`${API_BASE_URL}/market/predict/`, {
    method: 'POST',
    body: JSON.stringify({ commodity, mandi }),
  });
  if (!res.ok) throw new Error('Failed to forecast market price');
  return res.json();
};

// Weather API
export const apiGetWeather = async (lat?: number, lon?: number) => {
  const query = lat && lon ? `?lat=${lat}&lon=${lon}` : '';
  const res = await fetchWithAuth(`${API_BASE_URL}/weather/forecast/${query}`);
  if (!res.ok) throw new Error('Failed to fetch weather forecast');
  return res.json();
};
