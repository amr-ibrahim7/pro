"use client";
import { createContext, useContext } from 'react';

interface ThemeContextType {
  toggleTheme: () => void;
  theme?: string;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a CustomThemeProvider");
  }
  return context;
};