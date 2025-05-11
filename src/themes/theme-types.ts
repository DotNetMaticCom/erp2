// src/themes/theme-types.ts

/**
 * Bir temanın sağlaması gereken ham HSL renk parçalarının (Hue, Saturation, Lightness)
 * tip tanımı. Her renk için ayrı H, S, L değerleri beklenir.
 * Örnek: 'primary-h': '220', 'primary-s': '80%', 'primary-l': '50%'
 */
export interface RawThemeHSLParts {
  // === Çekirdek Renkler ===
  'primary-h': string; 'primary-s': string; 'primary-l': string;
  'primary-foreground-h'?: string; 'primary-foreground-s'?: string; 'primary-foreground-l': string;

  'secondary-h': string; 'secondary-s': string; 'secondary-l': string;
  'secondary-foreground-h'?: string; 'secondary-foreground-s'?: string; 'secondary-foreground-l': string;

  'accent-h': string; 'accent-s': string; 'accent-l': string;
  'accent-foreground-h'?: string; 'accent-foreground-s'?: string; 'accent-foreground-l': string;

  // === Nötr Renk Skalası (Örnek olarak birkaçı) ===
  // Genellikle sadece Lightness (L) değişir, H ve S sabit kalır veya hafif oynar.
  'neutral-default-h': string;
  'neutral-default-s': string;

  'neutral-0-l': string;     // Genellikle en açık (örn: beyaz)
  'neutral-50-l': string;
  'neutral-100-l': string;
  'neutral-200-l': string;
  'neutral-300-l': string;
  'neutral-400-l': string;
  'neutral-500-l': string;
  'neutral-600-l': string;
  'neutral-700-l': string;
  'neutral-800-l': string;
  'neutral-900-l': string;
  'neutral-950-l': string; // Genellikle en koyu (örn: siyah)

  // === Durum Renkleri ===
  'success-h': string; 'success-s': string; 'success-l': string;
  'success-foreground-h'?: string; 'success-foreground-s'?: string; 'success-foreground-l': string;

  'warning-h': string; 'warning-s': string; 'warning-l': string;
  'warning-foreground-h'?: string; 'warning-foreground-s'?: string; 'warning-foreground-l': string;

  'destructive-h': string; 'destructive-s': string; 'destructive-l': string;
  'destructive-foreground-h'?: string; 'destructive-foreground-s'?: string; 'destructive-foreground-l': string;

  'info-h': string; 'info-s': string; 'info-l': string;
  'info-foreground-h'?: string; 'info-foreground-s'?: string; 'info-foreground-l': string;

  // Gerekirse diğer temel renkler için HSL parçaları
  [key: string]: string | undefined; // Esneklik için, ama yukarıdakiler temel olmalı
}

export interface AppThemeConfig {
  name: string;        // Benzersiz ID (örn: "default-light", "ocean-dark")
  displayName: string; // Kullanıcı arayüzünde gösterilecek isim
  isDark: boolean;
  coreHSLParts: RawThemeHSLParts; // Temanın çekirdek ham HSL parçaları
}