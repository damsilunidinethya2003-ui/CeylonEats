import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileContext = createContext(null);
const STORAGE_KEY = '@ceyloneats_profile';

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({ name: 'Foodie', email: 'foodie@example.com' });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setProfile(JSON.parse(saved));
      } catch (error) {
        console.warn('Could not load profile:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadProfile();
  }, []);

  const updateProfile = async (nextProfile) => {
    setProfile(nextProfile);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextProfile));
    } catch (error) {
      console.warn('Could not save profile:', error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isLoaded }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used inside ProfileProvider');
  return context;
}
