// src/themes/ocean-theme/index.ts
import type { AppThemeConfig } from '../theme-types';
import { oceanLightHSLParts, oceanDarkHSLParts } from './ocean-hsl-parts';
import { defaultLightHSLParts, defaultDarkHSLParts } from '../default-theme/default-hsl-parts'; // Fallback için

export const oceanLightTheme: AppThemeConfig = {
  name: 'ocean-light',
  displayName: 'Okyanus (Açık)',
  isDark: false,
  // Öncelik oceanLightHSLParts'ta olacak, eksikler defaultLightHSLParts'tan tamamlanacak.
  coreHSLParts: { ...defaultLightHSLParts, ...oceanLightHSLParts },
};

export const oceanDarkTheme: AppThemeConfig = {
  name: 'ocean-dark',
  displayName: 'Okyanus (Koyu)',
  isDark: true,
  // Koyu mod için birleştirme stratejisi:
  // 1. Temel olarak default-light HSL parçalarını al (tüm anahtarların var olmasını garantilemek için).
  // 2. Üzerine okyanus-açık HSL parçalarını yaz (okyanus temasının temel renklerini uygula).
  // 3. Üzerine default-dark HSL parçalarını yaz (genel koyu mod ayarlamalarını uygula).
  // 4. En son okyanus-koyu HSL parçalarını yaz (okyanusa özgü koyu mod ince ayarlarını uygula).
  // Bu sıralama, istenen override davranışını sağlar.
  coreHSLParts: {
    ...defaultLightHSLParts,    // Temel fallback (tüm anahtarlar için)
    ...oceanLightHSLParts,     // Okyanus açık tema renkleri
    ...defaultDarkHSLParts,    // Genel koyu mod varsayılanları (L değerleri vb.)
    ...oceanDarkHSLParts       // Okyanus koyu tema spesifik override'ları
  },
};