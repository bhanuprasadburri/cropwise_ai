import type { MarketItem } from '../types';
import { sampleMarketData } from '../data/mockData';

export interface PredictionRequest {
  cropName: string;
  state: string;
  district: string;
  horizonDays: number;
}

export interface PricePredictionResult {
  cropName: string;
  currentPrice: number;
  predictedPrice: number;
  priceChangePercent: number;
  confidenceScore: number;
  horizonDays: number;
  trend: 'Upward' | 'Downward' | 'Stable';
  factors: string[];
  historicalSeries: { date: string; price: number }[];
  predictedSeries: { date: string; price: number; confidenceLow: number; confidenceHigh: number }[];
}

export const predictFutureMarketPrice = (req: PredictionRequest): PricePredictionResult => {
  const match = sampleMarketData.find((m) => m.cropName.toLowerCase().includes(req.cropName.toLowerCase())) || sampleMarketData[0];

  const multiplier = 1 + (req.horizonDays * 0.002);
  const predictedPrice = Math.round(match.currentPrice * multiplier);
  const priceChangePercent = Number((((predictedPrice - match.currentPrice) / match.currentPrice) * 100).toFixed(1));

  const confidenceScore = req.horizonDays <= 30 ? 92 : req.horizonDays <= 60 ? 86 : 79;

  return {
    cropName: match.cropName,
    currentPrice: match.currentPrice,
    predictedPrice,
    priceChangePercent,
    confidenceScore,
    horizonDays: req.horizonDays,
    trend: priceChangePercent >= 0 ? 'Upward' : 'Downward',
    factors: match.factors,
    historicalSeries: match.historicalPrices,
    predictedSeries: match.futurePredictions
  };
};
