// src/themes/default-theme/config/theme.ts
import type { AppThemeConfig } from '../../theme-types'; // Yeni tip
import { defaultLightHSLParts, defaultDarkHSLParts } from '../default-hsl-parts'; // Yeni HSL parçaları

// Eski ThemeConfig ve diğer exportlar (defaultColors vb.) kaldırılabilir veya yorum satırına alınabilir.

export const defaultLightThemeConfig: AppThemeConfig = {
  name: 'default-light', // İsimlendirmeyi tutarlı hale getirin
  displayName: 'Default Tema (Açık)',
  isDark: false,
  coreHSLParts: defaultLightHSLParts,
};

export const defaultDarkThemeConfig: AppThemeConfig = {
  name: 'default-dark',
  displayName: 'Default Tema (Koyu)',
  isDark: true,
  // Koyu tema için, açık tema HSL parçalarını alıp üzerine koyu mod için olanları yazın.
  // Bu, sadece değişen HSL parçalarını defaultDarkHSLParts içinde tanımlamanızı sağlar.
  coreHSLParts: { ...defaultLightHSLParts, ...defaultDarkHSLParts },
};

// Eskisi gibi availableThemes array'ini yeni configlerle güncelleyin.
// export const availableThemes = [defaultLightThemeConfig, defaultDarkThemeConfig];
// Bu array artık src/themes/index.ts içinde yönetilecek.