import { UserProfile, Farm, DiseaseDetectionResult, SavedReport, AlertNotification } from '../types';
import { initialProfile, initialFarms, initialDiseaseScans, initialReports, initialAlerts } from '../data/mockData';

const KEYS = {
  PROFILE: 'cropwise_user_profile',
  FARMS: 'cropwise_farms',
  SCANS: 'cropwise_scans',
  REPORTS: 'cropwise_reports',
  ALERTS: 'cropwise_alerts',
  AUTH: 'cropwise_auth'
};

// Database Initialization & LocalStorage Wrappers
export const db = {
  getProfile: (): UserProfile => {
    const isAuth = db.getAuth();
    if (!isAuth) return initialProfile;
    const data = localStorage.getItem(KEYS.PROFILE);
    return data ? JSON.parse(data) : initialProfile;
  },
  saveProfile: (profile: UserProfile): void => {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  },

  getFarms: (): Farm[] => {
    const data = localStorage.getItem(KEYS.FARMS);
    return data ? JSON.parse(data) : initialFarms;
  },
  saveFarms: (farms: Farm[]): void => {
    localStorage.setItem(KEYS.FARMS, JSON.stringify(farms));
  },

  getScans: (): DiseaseDetectionResult[] => {
    const data = localStorage.getItem(KEYS.SCANS);
    return data ? JSON.parse(data) : initialDiseaseScans;
  },
  saveScans: (scans: DiseaseDetectionResult[]): void => {
    localStorage.setItem(KEYS.SCANS, JSON.stringify(scans));
  },

  getReports: (): SavedReport[] => {
    const data = localStorage.getItem(KEYS.REPORTS);
    return data ? JSON.parse(data) : initialReports;
  },
  saveReports: (reports: SavedReport[]): void => {
    localStorage.setItem(KEYS.REPORTS, JSON.stringify(reports));
  },

  getAlerts: (): AlertNotification[] => {
    const data = localStorage.getItem(KEYS.ALERTS);
    return data ? JSON.parse(data) : initialAlerts;
  },
  saveAlerts: (alerts: AlertNotification[]): void => {
    localStorage.setItem(KEYS.ALERTS, JSON.stringify(alerts));
  },

  getAuth: (): boolean => {
    const data = localStorage.getItem(KEYS.AUTH);
    return data !== null ? JSON.parse(data) : false;
  },
  saveAuth: (auth: boolean): void => {
    localStorage.setItem(KEYS.AUTH, JSON.stringify(auth));
  }
};
