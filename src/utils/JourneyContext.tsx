"use client";

import { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface JourneyData {
  love: string[];
  goodAt: string[];
  worldNeeds: string[];
  paidFor: string[];
}

interface JourneyContextType {
  data: JourneyData;
  updateData: (step: keyof JourneyData, values: string[]) => void;
  isLoaded: boolean;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export const JourneyProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<JourneyData>({
    love: [],
    goodAt: [],
    worldNeeds: [],
    paidFor: [],
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("ikigaiJourneyData");
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("ikigaiJourneyData", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to save data to localStorage", error);
      }
    }
  }, [data, isLoaded]);

  const updateData = (step: keyof JourneyData, values: string[]) => {
    setData((prevData) => ({
      ...prevData,
      [step]: values,
    }));
  };

  return (
    <JourneyContext.Provider value={{ data, updateData, isLoaded }}>
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => {
  const context = useContext(JourneyContext);
  if (context === undefined) {
    throw new Error("useJourney must be used within a JourneyProvider");
  }
  return context;
};