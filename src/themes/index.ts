// src/themes/index.ts
import type { AppThemeConfig } from './theme-types';
import { defaultLightThemeConfig, defaultDarkThemeConfig } from './default-theme';
import { oceanLightTheme, oceanDarkTheme } from './ocean-theme'; // Yeni temayı import et

export const allAppThemes: AppThemeConfig[] = [
  defaultLightThemeConfig,
  defaultDarkThemeConfig,
  oceanLightTheme,       // Yeni temayı ekle
  oceanDarkTheme,        // Yeni temanın koyu modunu ekle
  // Gelecekteki diğer tüm tema config'leri buraya eklenecek
];

// getAppThemeConfig, saveThemePreference, loadThemePreference,
// isSystemDarkMode, watchSystemTheme fonksiyonları olduğu gibi kalır.
export function getAppThemeConfig(themeName: string): AppThemeConfig | undefined {
  return allAppThemes.find(t => t.name === themeName);
}

const THEME_PREFERENCE_KEY = 'theme-preference';

export function saveThemePreference(themeName: string): void {
  try {
    localStorage.setItem(THEME_PREFERENCE_KEY, themeName);
  } catch (error) {
    console.warn("localStorage'a erişilemiyor, tema tercihi kaydedilemedi.", error);
  }
}

export function loadThemePreference(): string | null {
  try {
    return localStorage.getItem(THEME_PREFERENCE_KEY);
  } catch (error) {
    console.warn("localStorage'a erişilemiyor, tema tercihi yüklenemedi.", error);
    return null;
  }
}

export function isSystemDarkMode(): boolean {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

export function watchSystemTheme(callback: (isDark: boolean) => void): () => void {
  if (typeof window !== 'undefined' && window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => callback(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }
  return () => {};
}

export type { AppThemeConfig };
export { NewThemeProvider, useTheme } from './ThemeProvider'; // ThemeProvider'ı buradan export et