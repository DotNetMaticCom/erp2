
import * as React from "react";
import { BaseThemeName, ThemeVariant } from "@/components/theme-provider";

interface UseThemeStateProps {
  defaultBaseTheme: BaseThemeName;
  defaultThemeVariant: ThemeVariant;
  storageKeyBaseTheme: string;
  storageKeyThemeVariant: string;
  storageKeyCustomColors: string;
  storageKeyFontFamily: string;
}

export function useThemeState({
  defaultBaseTheme,
  defaultThemeVariant,
  storageKeyBaseTheme,
  storageKeyThemeVariant,
  storageKeyCustomColors,
  storageKeyFontFamily,
}: UseThemeStateProps) {
  // Base theme state
  const [baseTheme, setBaseThemeState] = React.useState<BaseThemeName>(
    () => (localStorage.getItem(storageKeyBaseTheme) as BaseThemeName) || defaultBaseTheme
  );
  
  // Theme variant state (light/dark)
  const [themeVariant, setThemeVariantState] = React.useState<ThemeVariant>(
    () => (localStorage.getItem(storageKeyThemeVariant) as ThemeVariant) || defaultThemeVariant
  );
  
  // Selected font state
  const [selectedFontCssName, setSelectedFontCssNameState] = React.useState<string>(
    () => localStorage.getItem(storageKeyFontFamily) || "Inter, ui-sans-serif, system-ui, sans-serif"
  );
  
  // Custom theme state
  const [isCustomThemeActive, setIsCustomThemeActive] = React.useState<boolean>(baseTheme === "custom");

  // Calculate the full theme name based on base theme and variant
  const activeFullThemeName = React.useMemo(() => {
    if (baseTheme === "custom") {
      return `custom-${themeVariant}`;
    }
    return `${baseTheme}-${themeVariant}`;
  }, [baseTheme, themeVariant]);

  // Set base theme handler with localStorage persistence
  const setBaseTheme = (newBaseTheme: BaseThemeName) => {
    localStorage.setItem(storageKeyBaseTheme, newBaseTheme);
    setBaseThemeState(newBaseTheme);
    setIsCustomThemeActive(newBaseTheme === "custom");
  };

  // Set theme variant handler with localStorage persistence
  const setThemeVariant = (newVariant: ThemeVariant) => {
    localStorage.setItem(storageKeyThemeVariant, newVariant);
    setThemeVariantState(newVariant);
  };

  // Set font handler with localStorage persistence
  const setSelectedFontCssName = (fontCssName: string) => {
    localStorage.setItem(storageKeyFontFamily, fontCssName);
    setSelectedFontCssNameState(fontCssName);
  };

  return {
    baseTheme,
    themeVariant,
    selectedFontCssName,
    isCustomThemeActive,
    activeFullThemeName,
    setBaseTheme,
    setThemeVariant,
    setSelectedFontCssName,
  };
}
