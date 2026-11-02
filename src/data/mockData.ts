import type { UserProfile, Farm, Crop, DiseaseDetectionResult, MarketItem, WeatherInfo, AlertNotification, SavedReport, OrganicPractice, PestInfo } from '../types';

export const initialProfile: UserProfile = {
  name: 'XYZ (Demo Mode)',
  email: 'xyz.demo@gmail.com',
  phone: '+91 98480 12345',
  location: 'Narasaraopet',
  state: 'Andhra Pradesh',
  district: 'Palnadu',
  preferredLanguage: 'Telugu / English',
  farmSize: '5.5 Acres',
  primaryCrop: 'Paddy (Rice) & Tomato',
  experienceYears: 12,
  avatarUrl: '/images/farmer_avatar.jpg',
  role: 'Demo Farmer & Agronomist'
};

export const initialFarms: Farm[] = [
  {
    id: 'farm-1',
    name: 'Green Valley Farm',
    location: 'Narasaraopet',
    state: 'Andhra Pradesh',
    district: 'Palnadu',
    areaAcres: 5.0,
    soilType: 'Clay Loam',
    irrigationType: 'Borewell / Tube Well',
    currentCrop: 'Paddy (BPT 5204)',
    sowingDate: '2026-06-15',
    healthScore: 84,
    soilPh: 6.8
  },
  {
    id: 'farm-2',
    name: 'Sunnyside Vegetable Plot',
    location: 'Guntur Rural',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    areaAcres: 2.5,
    soilType: 'Sandy Loam',
    irrigationType: 'Drip',
    currentCrop: 'Tomato (Hybrid)',
    sowingDate: '2026-07-01',
    healthScore: 78,
    soilPh: 6.4
  },
  {
    id: 'farm-3',
    name: 'Krishna Basin Cotton Fields',
    location: 'Amaravati',
    state: 'Andhra Pradesh',
    district: 'NTR',
    areaAcres: 8.0,
    soilType: 'Black Cotton',
    irrigationType: 'Canal',
    currentCrop: 'Cotton (Bt Hybrid)',
    sowingDate: '2026-05-28',
    healthScore: 89,
    soilPh: 7.2
  }
];

export const sampleCrops: Crop[] = [
  {
    id: 'crop-1',
    name: 'Paddy (Rice)',
    category: 'Cereals',
    image: '/images/paddy_crop.jpg',
    bestSeason: 'Kharif',
    waterRequirement: 'High',
    durationDays: '120–140 days',
    expectedYield: '40–60 quintals/acre',
    currentPrice: 2300,
    predictedPrice: 2480,
    priceTrendPercent: 7.8,
    suitabilityScore: 94,
    profitPotential: 'High',
    diseaseRisk: 'Low',
    description: 'Paddy is the primary staple cereal crop cultivated in alluvial and clay loam river basins. Requires standing water or controlled irrigation during tillering phase.',
    whyRecommended: 'Paddy is recommended because your Kharif season, Clay Loam soil, pH 6.8, and borewell water availability match optimal growing conditions.'
  },
  {
    id: 'crop-2',
    name: 'Maize (Corn)',
    category: 'Cereals',
    image: '/images/maize_crop.jpg',
    bestSeason: 'Kharif',
    waterRequirement: 'Moderate',
    durationDays: '90–110 days',
    expectedYield: '30–45 quintals/acre',
    currentPrice: 2150,
    predictedPrice: 2320,
    priceTrendPercent: 7.9,
    suitabilityScore: 88,
    profitPotential: 'High',
    diseaseRisk: 'Moderate',
    description: 'High-yielding cereal crop versatile for human consumption, cattle fodder, and industrial starch production.',
    whyRecommended: 'Maize offers short crop duration, moderate water usage, and stable demand from regional feed mills.'
  },
  {
    id: 'crop-3',
    name: 'Tomato (Hybrid)',
    category: 'Vegetables',
    image: '/images/tomato_crop.jpg',
    bestSeason: 'All Seasons',
    waterRequirement: 'Moderate',
    durationDays: '75–90 days',
    expectedYield: '150–250 quintals/acre',
    currentPrice: 1850,
    predictedPrice: 2100,
    priceTrendPercent: 13.5,
    suitabilityScore: 86,
    profitPotential: 'Very High',
    diseaseRisk: 'Moderate',
    description: 'High-value commercial vegetable crop with quick cash return. Requires drip irrigation and proactive blight management.',
    whyRecommended: 'Strong market returns with drip irrigation suitability on your Sandy Loam plot.'
  },
  {
    id: 'crop-4',
    name: 'Cotton (Bt Hybrid)',
    category: 'Cash Crops',
    image: '/images/cotton_crop.jpg',
    bestSeason: 'Kharif',
    waterRequirement: 'Moderate',
    durationDays: '150–180 days',
    expectedYield: '12–18 quintals/acre',
    currentPrice: 7100,
    predictedPrice: 7450,
    priceTrendPercent: 4.9,
    suitabilityScore: 82,
    profitPotential: 'High',
    diseaseRisk: 'Moderate',
    description: 'Major industrial cash crop well suited for deep black cotton soils with good moisture retention.',
    whyRecommended: 'Black cotton soil profile provides deep root anchorage and high lint quality.'
  },
  {
    id: 'crop-5',
    name: 'Groundnut (Peanut)',
    category: 'Oilseeds',
    image: '/images/groundnut_crop.jpg',
    bestSeason: 'Rabi',
    waterRequirement: 'Low',
    durationDays: '100–120 days',
    expectedYield: '15–22 quintals/acre',
    currentPrice: 6250,
    predictedPrice: 6580,
    priceTrendPercent: 5.2,
    suitabilityScore: 80,
    profitPotential: 'Moderate',
    diseaseRisk: 'Low',
    description: 'Leguminous oilseed crop that fixes atmospheric nitrogen, improving long-term soil structure and fertility.',
    whyRecommended: 'Low water requirement makes it an ideal crop rotation option for soil nitrogen enrichment.'
  },
  {
    id: 'crop-6',
    name: 'Pigeon Pea (Red Gram)',
    category: 'Pulses',
    image: '/images/pigeon_pea_crop.jpg',
    bestSeason: 'Kharif',
    waterRequirement: 'Low',
    durationDays: '160–180 days',
    expectedYield: '8–12 quintals/acre',
    currentPrice: 7600,
    predictedPrice: 8100,
    priceTrendPercent: 6.5,
    suitabilityScore: 78,
    profitPotential: 'High',
    diseaseRisk: 'Low',
    description: 'Drought-tolerant pulse crop ideal for intercropping with cotton or maize.',
    whyRecommended: 'High market prices for pulses in domestic markets combined with minimal irrigation needs.'
  },
  {
    id: 'crop-7',
    name: 'Wheat (Sharbati)',
    category: 'Cereals',
    image: '/images/wheat_crop.jpg',
    bestSeason: 'Rabi',
    waterRequirement: 'Moderate',
    durationDays: '110–130 days',
    expectedYield: '22–30 quintals/acre',
    currentPrice: 2420,
    predictedPrice: 2580,
    priceTrendPercent: 6.6,
    suitabilityScore: 89,
    profitPotential: 'High',
    diseaseRisk: 'Low',
    description: 'Premier staple cereal grown during Rabi winter season in fertile loamy soils with cool growth temperatures.',
    whyRecommended: 'High consumer demand and government MSP procurement floor supporting profitable returns.'
  },
  {
    id: 'crop-8',
    name: 'Sugarcane (Co 0238)',
    category: 'Cash Crops',
    image: '/images/sugarcane_crop.jpg',
    bestSeason: 'All Seasons',
    waterRequirement: 'High',
    durationDays: '300–360 days',
    expectedYield: '350–500 quintals/acre',
    currentPrice: 315,
    predictedPrice: 340,
    priceTrendPercent: 7.9,
    suitabilityScore: 84,
    profitPotential: 'Very High',
    diseaseRisk: 'Moderate',
    description: 'Long-duration heavy cash crop grown for sugar mills and jaggery production with high biomass yield.',
    whyRecommended: 'Assured mill procurement agreements and high income return per acre.'
  }
];

export const initialDiseaseScans: DiseaseDetectionResult[] = [
  {
    id: 'scan-101',
    date: '2026-09-02',
    crop: 'Tomato',
    diseaseName: 'Tomato Early Blight (Alternaria solani)',
    confidence: 94.6,
    severity: 'High',
    overview: 'Early blight is a fungal disease causing circular dark brown spots with concentric ring patterns on older lower leaves, rapidly progressing upward.',
    symptoms: [
      'Dark brown concentric bullseye ring spots on lower leaves',
      'Yellow halo surrounding necrotic spots',
      'Stem lesion formation near node junctions',
      'Premature defoliation resulting in sunscalded fruit'
    ],
    causes: [
      'High humidity (>85%) combined with warm temperature (24°C - 29°C)',
      'Fungal spores surviving in infected crop debris',
      'Excessive overhead sprinkler watering wet leaves'
    ],
    organicTreatment: [
      'Spray 5% Neem Seed Kernel Extract (NSKE) or Cold-Pressed Neem Oil (5ml/liter water)',
      'Apply bio-fungicide Trichoderma viride or Pseudomonas fluorescens at 10g/liter soil drench',
      'Prune lower infected leaves up to 12 inches from ground level and burn debris'
    ],
    chemicalTreatment: [
      'Spray Mancozeb 75% WP @ 2.5g/liter or Copper Oxychloride 50% WP @ 3g/liter',
      'Alternate with Difenoconazole 25% EC @ 1ml/liter for systemic suppression'
    ],
    prevention: [
      'Maintain 60cm row spacing for good canopy air circulation',
      'Apply organic straw mulching to prevent rain splash of soil spores',
      'Rotate crops with non-solanaceous crops (e.g. Maize, Pulses) every 2 seasons'
    ],
    affectedParts: ['Leaves', 'Stems', 'Fruit Calyx'],
    leafImageUrl: '/images/diseased_tomato_leaf.jpg',
    farmName: 'Sunnyside Vegetable Plot',
    bbox: { x: 25, y: 30, width: 50, height: 45 }
  },
  {
    id: 'scan-100',
    date: '2026-08-26',
    crop: 'Paddy',
    diseaseName: 'Bacterial Leaf Blight (Xanthomonas oryzae)',
    confidence: 91.2,
    severity: 'Moderate',
    overview: 'Bacterial blight causes yellowing and drying of leaves starting from tips downwards along margins.',
    symptoms: [
      'Water-soaked lesions on leaf margins turning wavy yellow',
      'Bacterial ooze droplets visible early morning',
      'Drying and wilting of tillers (Kresek phase)'
    ],
    causes: ['High nitrogen fertilization', 'High rain humidity', 'Infected seed stock'],
    organicTreatment: ['Fresh cow dung slurry spray 20%', 'Neem oil spray 3ml/L'],
    chemicalTreatment: ['Streptocycline 6g + Copper Oxychloride 500g in 200L water per acre'],
    prevention: ['Avoid excessive nitrogen dosage', 'Use resistant cultivars like BPT 5204'],
    affectedParts: ['Leaf blade', 'Leaf sheath'],
    leafImageUrl: '/images/paddy_blight_leaf.jpg',
    farmName: 'Green Valley Farm'
  }
];

export const sampleMarketData: MarketItem[] = [
  {
    id: 'mkt-paddy',
    cropName: 'Paddy (Common)',
    state: 'Andhra Pradesh',
    district: 'Palnadu',
    marketName: 'Narasaraopet Agricultural Produce Market',
    currentPrice: 2300,
    priceChange: 6.2,
    demand: 'High',
    arrivalVolume: '1,450 Quintals/day',
    historicalPrices: [
      { date: '2026-08-01', price: 2150 },
      { date: '2026-08-08', price: 2180 },
      { date: '2026-08-15', price: 2210 },
      { date: '2026-08-22', price: 2260 },
      { date: '2026-08-29', price: 2290 },
      { date: '2026-09-02', price: 2300 }
    ],
    futurePredictions: [
      { date: '2026-09-09 (7d)', price: 2340, confidenceLow: 2310, confidenceHigh: 2370 },
      { date: '2026-09-23 (21d)', price: 2410, confidenceLow: 2360, confidenceHigh: 2460 },
      { date: '2026-10-02 (30d)', price: 2480, confidenceLow: 2420, confidenceHigh: 2540 },
      { date: '2026-11-02 (60d)', price: 2550, confidenceLow: 2480, confidenceHigh: 2620 }
    ],
    factors: [
      'Seasonal buffer stock procurement by FCI',
      'Increased export demand for non-basmati rice',
      'Moderate mandi arrivals supporting price firming'
    ]
  },
  {
    id: 'mkt-tomato',
    cropName: 'Tomato',
    state: 'Andhra Pradesh',
    district: 'Guntur',
    marketName: 'Guntur Wholesale Vegetable Market',
    currentPrice: 1850,
    priceChange: 13.5,
    demand: 'High',
    arrivalVolume: '820 Quintals/day',
    historicalPrices: [
      { date: '2026-08-01', price: 1400 },
      { date: '2026-08-08', price: 1520 },
      { date: '2026-08-15', price: 1650 },
      { date: '2026-08-22', price: 1720 },
      { date: '2026-08-29', price: 1810 },
      { date: '2026-09-02', price: 1850 }
    ],
    futurePredictions: [
      { date: '2026-09-09 (7d)', price: 1920, confidenceLow: 1850, confidenceHigh: 1990 },
      { date: '2026-09-23 (21d)', price: 2040, confidenceLow: 1950, confidenceHigh: 2130 },
      { date: '2026-10-02 (30d)', price: 2100, confidenceLow: 2000, confidenceHigh: 2200 }
    ],
    factors: [
      'Heavy rain disruption in nearby growing belts',
      'High urban consumption demand in Vijayawada & Hyderabad',
      'Lower supply arrivals expected next 2 weeks'
    ]
  },
  {
    id: 'mkt-cotton',
    cropName: 'Cotton (Lint)',
    state: 'Andhra Pradesh',
    district: 'Palnadu',
    marketName: 'Narasaraopet Cotton Market Yard',
    currentPrice: 7100,
    priceChange: 4.9,
    demand: 'Moderate',
    arrivalVolume: '2,100 Quintals/day',
    historicalPrices: [
      { date: '2026-08-01', price: 6800 },
      { date: '2026-08-08', price: 6890 },
      { date: '2026-08-15', price: 6950 },
      { date: '2026-08-22', price: 7020 },
      { date: '2026-08-29', price: 7080 },
      { date: '2026-09-02', price: 7100 }
    ],
    futurePredictions: [
      { date: '2026-09-09 (7d)', price: 7180, confidenceLow: 7100, confidenceHigh: 7260 },
      { date: '2026-10-02 (30d)', price: 7450, confidenceLow: 7300, confidenceHigh: 7600 }
    ],
    factors: [
      'Spinning mill procurement momentum',
      'International lint cotton futures stability',
      'Govt Minimum Support Price (MSP) standard floor'
    ]
  }
];

export const sampleWeather: WeatherInfo = {
  location: 'Narasaraopet, Palnadu, AP',
  currentTemp: 28,
  condition: 'Partly Cloudy with Humidity',
  humidity: 74,
  rainfall: 12,
  windSpeed: 14,
  soilMoisture: 62,
  uvIndex: 6,
  advisories: [
    '🌧 Rain expected tomorrow afternoon (18mm) - delay pesticide application & irrigation.',
    '🦠 High humidity (74%) increases fungal blight risk in solanaceous vegetable crops.',
    '🌾 Favorable soil moisture (62%) for Kharif paddy tillering phase.'
  ],
  tempTrend: [
    { time: '06:00 AM', temp: 24, humidity: 85 },
    { time: '09:00 AM', temp: 27, humidity: 78 },
    { time: '12:00 PM', temp: 31, humidity: 68 },
    { time: '03:00 PM', temp: 33, humidity: 65 },
    { time: '06:00 PM', temp: 29, humidity: 75 },
    { time: '09:00 PM', temp: 26, humidity: 82 }
  ],
  dailyForecast: [
    { day: 'Today', date: '02 Sep', tempMax: 33, tempMin: 24, condition: 'Partly Cloudy', rainProbability: 30, humidity: 74, windSpeed: 14 },
    { day: 'Thu', date: '03 Sep', tempMax: 30, tempMin: 23, condition: 'Rainy', rainProbability: 85, humidity: 88, windSpeed: 18 },
    { day: 'Fri', date: '04 Sep', tempMax: 29, tempMin: 23, condition: 'Thunderstorm', rainProbability: 75, humidity: 84, windSpeed: 20 },
    { day: 'Sat', date: '05 Sep', tempMax: 31, tempMin: 24, condition: 'Partly Cloudy', rainProbability: 40, humidity: 76, windSpeed: 12 },
    { day: 'Sun', date: '06 Sep', tempMax: 32, tempMin: 24, condition: 'Sunny', rainProbability: 15, humidity: 68, windSpeed: 10 },
    { day: 'Mon', date: '07 Sep', tempMax: 33, tempMin: 25, condition: 'Sunny', rainProbability: 10, humidity: 65, windSpeed: 11 },
    { day: 'Tue', date: '08 Sep', tempMax: 34, tempMin: 25, condition: 'Cloudy', rainProbability: 25, humidity: 70, windSpeed: 13 }
  ]
};

export const initialAlerts: AlertNotification[] = [
  {
    id: 'alt-1',
    type: 'weather',
    title: 'Rain Forecast Warning',
    message: 'Heavy rain expected tomorrow (18mm). Pause drip irrigation & postpone spraying.',
    date: '10 minutes ago',
    read: false,
    severity: 'warning'
  },
  {
    id: 'alt-2',
    type: 'disease',
    title: 'High Fungal Disease Risk',
    message: 'Humidity > 74% elevates early blight risk in Tomato plots.',
    date: '2 hours ago',
    read: false,
    severity: 'critical'
  },
  {
    id: 'alt-3',
    type: 'market',
    title: 'Market Spike Alert',
    message: 'Tomato market prices rose +13.5% in Guntur Mandi reaching ₹1,850/qtl.',
    date: '1 day ago',
    read: true,
    severity: 'success'
  }
];

export const initialReports: SavedReport[] = [
  {
    id: 'rep-1',
    title: 'Tomato Early Blight Diagnostic & IPM Plan',
    type: 'Disease Detection',
    date: '02 Sep 2026',
    farmName: 'Sunnyside Vegetable Plot',
    summary: 'Detected Early Blight (94.6% confidence). Treatment plan generated with Neem oil & Mancozeb.'
  },
  {
    id: 'rep-2',
    title: 'Kharif 2026 Crop Suitability Assessment',
    type: 'Crop Recommendation',
    date: '28 Aug 2026',
    farmName: 'Green Valley Farm',
    summary: 'Paddy BPT 5204 scored 94% top recommendation based on clay loam soil and canal water access.'
  }
];

export const organicPractices: OrganicPractice[] = [
  {
    crop: 'Tomato',
    stage: 'Vegetative to Flowering',
    practiceType: 'Soil Management',
    title: 'Enriched Vermicompost & Neem Cake Application',
    description: 'Soil application of well-decomposed vermicompost blended with neem cake prevents root knot nematodes and enhances micro-flora.',
    howToApply: 'Apply 2 tons/acre vermicompost + 100 kg/acre neem cake around root zone before earthing up.',
    frequency: 'Once at land preparation, once at flowering stage.',
    benefits: 'Improves CEC, retains soil moisture, suppresses fungal pathogen growth naturally.',
    precautions: 'Ensure vermicompost is fully matured and not emitting excess heat.'
  },
  {
    crop: 'Paddy',
    stage: 'Tillering Stage',
    practiceType: 'Fertilizer',
    title: 'Azospirillum & PSB Bio-fertilizer Slurry',
    description: 'Biological nitrogen fixing bacteria that reduces dependency on synthetic chemical urea.',
    howToApply: 'Mix 2 kg Azospirillum + 2 kg PSB with 50 kg farmyard manure per acre and broadcast.',
    frequency: 'Apply within 20 days after seedling transplanting.',
    benefits: 'Fixes up to 25 kg N/ha and solubilizes soil phosphorus.',
    precautions: 'Do not mix directly with chemical fungicides or insecticides.'
  },
  {
    crop: 'Cotton',
    stage: 'Boll Formation Stage',
    practiceType: 'Pest Control',
    title: '5% Neem Seed Kernel Extract (NSKE) Foliar Spray',
    description: 'Natural botanical antifeedant and repellent for whitefly vectors and bollworms.',
    howToApply: 'Grind 5 kg neem seed kernels, soak in 100L water overnight with 200g soap powder. Filter & spray @ 200L/acre.',
    frequency: 'Every 12–15 days during dry warm spells.',
    benefits: 'Interrupts pest feeding cycles without harming beneficial predatory ladybird beetles.',
    precautions: 'Filter thoroughly through muslin cloth to prevent nozzle clogging.'
  },
  {
    crop: 'Wheat',
    stage: 'Sowing & Germination',
    practiceType: 'Pest Control',
    title: 'Trichoderma viride Bio-Fungicide Seed Coating',
    description: 'Biological antagonist suppressing seed-borne loose smut and root rot fungi.',
    howToApply: 'Slurry 10g Trichoderma viride + 5g Carboxin per kg of seed with rice starch solution before sowing.',
    frequency: 'Single treatment prior to seed drilling.',
    benefits: 'Boosts seedling vigor and eliminates soil-borne root pathogen infection.',
    precautions: 'Dry seeds in shade before sowing.'
  },
  {
    crop: 'Maize',
    stage: 'V4-V8 Vegetative Phase',
    practiceType: 'Fertilizer',
    title: 'Jeevamrutha Microbial Soil Drench',
    description: 'Fermented bio-enhancer containing indigenous nitrogen fixers and beneficial soil fungi.',
    howToApply: 'Mix 10 kg cow dung + 10L cow urine + 2 kg jaggery + 2 kg pulse flour in 200L water. Ferment 48h and drench 200L/acre.',
    frequency: 'Apply every 21 days along irrigation water.',
    benefits: 'Reactivates soil microbial population and improves cob fill size.',
    precautions: 'Stir liquid clockwise thrice daily during fermentation.'
  }
];

export const pestDatabase: PestInfo[] = [
  {
    crop: 'Tomato',
    pestName: 'Fruit Borer (Helicoverpa armigera)',
    stage: 'Fruiting Stage',
    severity: 'High',
    symptoms: [
      'Circular bore holes on young green and ripe tomato fruits',
      'Larva feeding with half body outside the fruit',
      'Premature rotting and dropping of affected fruits'
    ],
    culturalControl: [
      'Plant Marigold (Tagetes erecta) as a trap crop (1 line of marigold for every 16 lines of tomato)',
      'Deep summer plowing to expose pupae to scorching sunlight and bird predators'
    ],
    mechanicalControl: [
      'Install 10 Pheromone traps per acre with Helilure for monitoring adult male moths',
      'Hand-pick and destroy early instar larvae and bored fruits'
    ],
    biologicalControl: [
      'Release Trichogramma chilonis egg parasitoids @ 50,000/acre at weekly intervals',
      'Spray HaNPV (Helicoverpa Nuclear Polyhedrosis Virus) @ 250 LE/acre with 0.1% jaggery'
    ],
    chemicalControl: [
      'Chlorantraniliprole 18.5% SC @ 0.3ml/liter or Flubendiamide 480 SC @ 0.2ml/liter',
      'Emamectin Benzoate 5% SG @ 0.4g/liter of water'
    ],
    safetyWarning: 'Always wear protective gear (gloves, mask). Observe 5-7 days pre-harvest interval (PHI). Follow product label and CIBRC registered dosages.'
  },
  {
    crop: 'Paddy',
    pestName: 'Yellow Stem Borer (Scirpophaga incertulas)',
    stage: 'Tillering to Flowering Phase',
    severity: 'High',
    symptoms: [
      'Dead hearts (drying of central tiller shoot during vegetative phase)',
      'White heads (empty, bleached panicles at flowering phase)',
      'Bore holes near basal nodes with frass deposit'
    ],
    culturalControl: [
      'Clip seedling leaf tips before transplanting to destroy egg masses',
      'Harvest crop close to ground level to destroy overwintering larvae in stubble'
    ],
    mechanicalControl: [
      'Set up 8 Light Traps per acre between 7 PM and 10 PM to capture female moths',
      'Install 5 Pheromone traps/acre with Scirpo-lure'
    ],
    biologicalControl: [
      'Release Trichogramma japonicum egg parasitoid @ 40,000/acre at weekly intervals',
      'Conserve natural predators like long-horned grasshoppers and wolf spiders'
    ],
    chemicalControl: [
      'Cartap Hydrochloride 4G granules @ 10 kg/acre broadcast in standing water',
      'Chlorantraniliprole 0.4% G @ 4 kg/acre or Fipronil 80% WG @ 20g/acre'
    ],
    safetyWarning: 'Maintain 2-3 inches standing water during granular insecticide broadcasting. Observe 19 days pre-harvest interval.'
  },
  {
    crop: 'Cotton',
    pestName: 'Whitefly (Bemisia tabaci)',
    stage: 'Vegetative to Flowering',
    severity: 'High',
    symptoms: [
      'Sucking sap from undersides of leaves causing yellowing and leaf curling',
      'Excretion of sticky honeydew causing black sooty mold fungus on leaves',
      'Vector transmission of Cotton Leaf Curl Virus (CLCuV)'
    ],
    culturalControl: [
      'Avoid high nitrogen fertilizer application',
      'Grow barrier crops like Bajra or Maize around cotton fields'
    ],
    mechanicalControl: [
      'Install 25 Yellow Sticky Traps per acre @ 1 foot above canopy level'
    ],
    biologicalControl: [
      'Release Encarsia formosa parasitic wasps',
      'Spray Verticillium lecanii or Beauveria bassiana @ 5g/liter'
    ],
    chemicalControl: [
      'Afidopyropen 50g/L DC @ 2ml/liter or Diafenthiuron 50% WP @ 1.25g/liter',
      'Pyriproxyfen 10% EC @ 2ml/liter of water'
    ],
    safetyWarning: 'Spray thoroughly targeting leaf undersides during early morning hours.'
  }
];
