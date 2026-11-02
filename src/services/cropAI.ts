import type { Crop } from '../types';
import { sampleCrops } from '../data/mockData';

export interface RecommendationParams {
  farmName: string;
  season: 'Kharif' | 'Rabi' | 'Zaid';
  soilType: string;
  soilPh: number;
  waterAvailability: 'High' | 'Moderate' | 'Low';
  farmArea: number;
}

export const getSmartCropRecommendations = (params: RecommendationParams): Crop[] => {
  return sampleCrops.map((crop) => {
    let score = 70;

    // Season match
    if (crop.bestSeason === params.season || crop.bestSeason === 'All Seasons') {
      score += 15;
    } else {
      score -= 10;
    }

    // Soil & Water compatibility
    if (params.waterAvailability === 'High' && crop.waterRequirement === 'High') {
      score += 10;
    } else if (params.waterAvailability === 'Low' && crop.waterRequirement === 'Low') {
      score += 12;
    } else if (params.waterAvailability === 'Low' && crop.waterRequirement === 'High') {
      score -= 20;
    }

    // Soil pH scoring
    if (params.soilPh >= 6.0 && params.soilPh <= 7.5) {
      score += 8;
    }

    // Price trend bonus
    score += Math.min(10, Math.floor(crop.priceTrendPercent));

    const finalScore = Math.min(98, Math.max(45, score));

    let whyText = `${crop.name} is recommended because your ${params.season} season, ${params.soilType} soil, pH ${params.soilPh}, and ${params.waterAvailability.toLowerCase()} water availability align with optimal growth parameters.`;
    if (crop.name.includes('Paddy')) {
      whyText = `Paddy is the top match for ${params.season} with ${params.soilType} soil, featuring robust market price demand (+7.8%) in local AP mandis.`;
    } else if (crop.name.includes('Tomato')) {
      whyText = `Tomato hybrid yields high financial returns (₹1,850/qtl, +13.5% trend) and suits your ${params.farmArea}-acre plot with drip irrigation.`;
    }

    return {
      ...crop,
      suitabilityScore: finalScore,
      whyRecommended: whyText
    };
  }).sort((a, b) => b.suitabilityScore - a.suitabilityScore);
};
