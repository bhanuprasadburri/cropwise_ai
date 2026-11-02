export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  state: string;
  district: string;
  preferredLanguage: string;
  farmSize: string;
  primaryCrop: string;
  experienceYears: number;
  avatarUrl: string;
  role: string;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  state: string;
  district: string;
  areaAcres: number;
  soilType: 'Clay Loam' | 'Sandy Loam' | 'Black Cotton' | 'Red Soil' | 'Alluvial Soil' | 'Silty Clay';
  irrigationType: 'Drip' | 'Canal' | 'Borewell / Tube Well' | 'Sprinkler' | 'Rainfed';
  currentCrop: string;
  sowingDate: string;
  healthScore: number;
  soilPh: number;
}

export interface Crop {
  id: string;
  name: string;
  category: 'Cereals' | 'Pulses' | 'Oilseeds' | 'Vegetables' | 'Fruits' | 'Cash Crops';
  image: string;
  bestSeason: 'Kharif' | 'Rabi' | 'Zaid' | 'All Seasons';
  waterRequirement: 'Low' | 'Moderate' | 'High';
  durationDays: string;
  expectedYield: string;
  currentPrice: number; // ₹/quintal
  predictedPrice: number; // ₹/quintal
  priceTrendPercent: number;
  suitabilityScore: number; // 0 - 100
  profitPotential: 'High' | 'Moderate' | 'Very High' | 'Low';
  diseaseRisk: 'Low' | 'Moderate' | 'High';
  description: string;
  whyRecommended?: string;
}

export interface DiseaseDetectionResult {
  id: string;
  date: string;
  crop: string;
  diseaseName: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Severe';
  overview: string;
  symptoms: string[];
  causes: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  prevention: string[];
  affectedParts: string[];
  leafImageUrl: string;
  farmName: string;
  bbox?: { x: number; y: number; width: number; height: number };
}

export interface MarketItem {
  id: string;
  cropName: string;
  state: string;
  district: string;
  marketName: string;
  currentPrice: number;
  priceChange: number;
  demand: 'High' | 'Moderate' | 'Low';
  arrivalVolume: string;
  historicalPrices: { date: string; price: number }[];
  futurePredictions: { date: string; price: number; confidenceLow: number; confidenceHigh: number }[];
  factors: string[];
}

export interface WeatherDay {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Thunderstorm' | 'Cloudy';
  rainProbability: number;
  humidity: number;
  windSpeed: number;
}

export interface WeatherInfo {
  location: string;
  currentTemp: number;
  condition: string;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  soilMoisture: number;
  uvIndex: number;
  advisories: string[];
  dailyForecast: WeatherDay[];
  tempTrend: { time: string; temp: number; humidity: number }[];
}

export interface AlertNotification {
  id: string;
  type: 'weather' | 'disease' | 'market' | 'irrigation';
  title: string;
  message: string;
  date: string;
  read: boolean;
  severity: 'info' | 'warning' | 'critical' | 'success';
}

export interface SavedReport {
  id: string;
  title: string;
  type: 'Disease Detection' | 'Crop Recommendation' | 'Market Analysis' | 'Price Prediction' | 'Farm Health';
  date: string;
  farmName: string;
  summary: string;
}

export interface OrganicPractice {
  crop: string;
  stage: string;
  practiceType: 'Fertilizer' | 'Pest Control' | 'Soil Management' | 'Water Management';
  title: string;
  description: string;
  howToApply: string;
  frequency: string;
  benefits: string;
  precautions: string;
}

export interface PestInfo {
  crop: string;
  pestName: string;
  stage: string;
  severity: string;
  symptoms: string[];
  culturalControl: string[];
  mechanicalControl: string[];
  biologicalControl: string[];
  chemicalControl: string[];
  safetyWarning: string;
}
