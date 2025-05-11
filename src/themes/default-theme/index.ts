// src/themes/default-theme/index.ts
import type { AppThemeConfig } from '../theme-types'; // AppThemeConfig'i dışa aktar
import { defaultLightThemeConfig, defaultDarkThemeConfig } from './config/theme';

// Eski exportlar (defaultTheme, defaultDarkTheme, defaultColors vb.) kaldırılacak.
// applyTheme, saveThemePreference gibi yardımcı fonksiyonlar src/themes/index.ts'e taşınacak.

// Sadece bu temaya özgü config'leri export et
export { defaultLightThemeConfig, defaultDarkThemeConfig };
export type { AppThemeConfig }; // Tipi de export et ki diğer temalar kullanabilsin