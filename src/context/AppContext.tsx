import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, Farm, DiseaseDetectionResult, SavedReport, AlertNotification } from '../types';
import { initialProfile } from '../data/mockData';
import { db } from '../utils/storage';
import { clearAuthTokens } from '../services/api';

interface AppContextType {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  farms: Farm[];
  activeFarm: Farm;
  setActiveFarm: (farm: Farm) => void;
  addFarm: (farm: Omit<Farm, 'id' | 'healthScore'>) => void;
  editFarm: (id: string, updated: Partial<Farm>) => void;
  deleteFarm: (id: string) => void;
  diseaseScans: DiseaseDetectionResult[];
  addDiseaseScan: (scan: DiseaseDetectionResult) => void;
  deleteDiseaseScan: (id: string) => void;
  savedReports: SavedReport[];
  addSavedReport: (report: Omit<SavedReport, 'id'>) => void;
  deleteSavedReport: (id: string) => void;
  alerts: AlertNotification[];
  markAlertAsRead: (id: string) => void;
  clearAllAlerts: () => void;
  isAuthenticated: boolean;
  login: (email?: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfileState] = useState<UserProfile>(() => db.getProfile());
  const [farms, setFarmsState] = useState<Farm[]>(() => db.getFarms());
  const [activeFarm, setActiveFarmState] = useState<Farm>(() => db.getFarms()[0] || null);
  const [diseaseScans, setDiseaseScansState] = useState<DiseaseDetectionResult[]>(() => db.getScans());
  const [savedReports, setSavedReportsState] = useState<SavedReport[]>(() => db.getReports());
  const [alerts, setAlertsState] = useState<AlertNotification[]>(() => db.getAlerts());
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(() => db.getAuth());

  // Save profile to database on change
  const setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>> = (action) => {
    setUserProfileState((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      db.saveProfile(next);
      return next;
    });
  };

  const setActiveFarm = (farm: Farm) => {
    setActiveFarmState(farm);
  };

  const addFarm = (farmData: Omit<Farm, 'id' | 'healthScore'>) => {
    const newFarm: Farm = {
      ...farmData,
      id: `farm-${Date.now()}`,
      healthScore: Math.floor(Math.random() * 15) + 80,
    };
    const updated = [...farms, newFarm];
    setFarmsState(updated);
    db.saveFarms(updated);
    setActiveFarmState(newFarm);
  };

  const editFarm = (id: string, updatedFields: Partial<Farm>) => {
    const updated = farms.map((f) => (f.id === id ? { ...f, ...updatedFields } : f));
    setFarmsState(updated);
    db.saveFarms(updated);
    if (activeFarm && activeFarm.id === id) {
      setActiveFarmState((prev) => ({ ...prev, ...updatedFields }));
    }
  };

  const deleteFarm = (id: string) => {
    const updated = farms.filter((f) => f.id !== id);
    setFarmsState(updated);
    db.saveFarms(updated);
    if (activeFarm && activeFarm.id === id && updated.length > 0) {
      setActiveFarmState(updated[0]);
    }
  };

  const addDiseaseScan = (scan: DiseaseDetectionResult) => {
    const updatedScans = [scan, ...diseaseScans];
    setDiseaseScansState(updatedScans);
    db.saveScans(updatedScans);

    // Automatically record diagnostic report in database
    addSavedReport({
      title: `${scan.crop} ${scan.diseaseName} Diagnostic Report`,
      type: 'Disease Detection',
      date: scan.date,
      farmName: scan.farmName || activeFarm?.name || 'Main Farm',
      summary: `Confidence: ${scan.confidence}%. Severity: ${scan.severity}. Organic and chemical treatment recommendations included.`
    });
  };

  const deleteDiseaseScan = (id: string) => {
    const updated = diseaseScans.filter((s) => s.id !== id);
    setDiseaseScansState(updated);
    db.saveScans(updated);
  };

  const addSavedReport = (reportData: Omit<SavedReport, 'id'>) => {
    const newReport: SavedReport = {
      ...reportData,
      id: `rep-${Date.now()}`
    };
    const updated = [newReport, ...savedReports];
    setSavedReportsState(updated);
    db.saveReports(updated);
  };

  const deleteSavedReport = (id: string) => {
    const updated = savedReports.filter((r) => r.id !== id);
    setSavedReportsState(updated);
    db.saveReports(updated);
  };

  const markAlertAsRead = (id: string) => {
    const updated = alerts.map((a) => (a.id === id ? { ...a, read: true } : a));
    setAlertsState(updated);
    db.saveAlerts(updated);
  };

  const clearAllAlerts = () => {
    setAlertsState([]);
    db.saveAlerts([]);
  };

  const login = (email?: string) => {
    setIsAuthenticatedState(true);
    db.saveAuth(true);
    if (email) {
      setUserProfileState((prev) => {
        const updated = {
          ...prev,
          email: email,
          name: prev.name.includes('Demo') ? email.split('@')[0].toUpperCase() : prev.name
        };
        db.saveProfile(updated);
        return updated;
      });
    }
  };

  const logout = () => {
    setIsAuthenticatedState(false);
    clearAuthTokens();
    db.saveAuth(false);
    setUserProfileState(initialProfile);
    db.saveProfile(initialProfile);
  };

  return (
    <AppContext.Provider
      value={{
        userProfile: isAuthenticated ? userProfile : initialProfile,
        setUserProfile,
        farms,
        activeFarm: activeFarm || farms[0],
        setActiveFarm,
        addFarm,
        editFarm,
        deleteFarm,
        diseaseScans,
        addDiseaseScan,
        deleteDiseaseScan,
        savedReports,
        addSavedReport,
        deleteSavedReport,
        alerts,
        markAlertAsRead,
        clearAllAlerts,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
