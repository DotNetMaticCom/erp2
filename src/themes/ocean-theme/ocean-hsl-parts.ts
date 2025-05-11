// src/themes/ocean-theme/ocean-hsl-parts.ts
import type { RawThemeHSLParts } from '../theme-types';

export const oceanLightHSLParts: RawThemeHSLParts = {
  // === Okyanus Teması - Açık Mod Çekirdek Renkleri ===
  'primary-h': '200', 'primary-s': '70%', 'primary-l': '50%', // Canlı bir mavi tonu
  'primary-foreground-h': '0', 'primary-foreground-s': '0%', 'primary-foreground-l': '100%', // Mavi üzerine beyaz metin

  'secondary-h': '180', 'secondary-s': '40%', 'secondary-l': '60%', // Turkuaz/deniz köpüğü tonu
  'secondary-foreground-h': '0', 'secondary-foreground-s': '0%', 'secondary-foreground-l': '10%', // Üzerine koyu metin

  'accent-h': '30', 'accent-s': '80%', 'accent-l': '55%',   // Mercan/kum rengi vurgu
  'accent-foreground-h': '0', 'accent-foreground-s': '0%', 'accent-foreground-l': '10%',

  // === Nötr Renk Skalası (Açık Tema - Okyanus için belki hafif maviye çalan griler) ===
  'neutral-default-h': '200',
  'neutral-default-s': '10%', // Genel bir doygunluk, bazıları %15, bazıları %12 idi. %10 ortalama bir değer.
  'neutral-0-l': '100%',   // Çok açık, neredeyse beyaz
  'neutral-50-l': '97%',  // Sayfa arkaplanı
  'neutral-100-l': '94%', // Kart/Input arkaplanı
  'neutral-200-l': '88%', // Kenarlıklar
  'neutral-300-l': '80%',
  'neutral-400-l': '70%',
  'neutral-500-l': '60%',
  'neutral-600-l': '45%',
  'neutral-700-l': '35%',
  'neutral-800-l': '25%',
  'neutral-900-l': '20%', // Ana metin rengi
  'neutral-950-l': '10%', // En koyu

  // === Durum Renkleri (Okyanus Temasına Uygunlaştırılabilir) ===
  'success-h': '160', 'success-s': '60%', 'success-l': '45%',
  'success-foreground-h': '0', 'success-foreground-s': '0%', 'success-foreground-l': '100%',
  'warning-h': '45', 'warning-s': '85%', 'warning-l': '50%', // Kum sarısı gibi
  'warning-foreground-h': '0', 'warning-foreground-s': '0%', 'warning-foreground-l': '15%',
  'destructive-h': '0', 'destructive-s': '70%', 'destructive-l': '50%', // Koyu kırmızı mercan
  'destructive-foreground-h': '0', 'destructive-foreground-s': '0%', 'destructive-foreground-l': '100%',
  'info-h': '210', 'info-s': '70%', 'info-l': '55%', // Açık gökyüzü mavisi
  'info-foreground-h': '0', 'info-foreground-s': '0%', 'info-foreground-l': '100%',
};

export const oceanDarkHSLParts: RawThemeHSLParts = {
  // === Okyanus Teması - Koyu Mod Çekirdek Renk Override'ları ===
  'primary-h': oceanLightHSLParts['primary-h'], 'primary-s': oceanLightHSLParts['primary-s'], 'primary-l': '60%',
  'primary-foreground-h': '0', 'primary-foreground-s': '0%', 'primary-foreground-l': '10%',

  'secondary-h': oceanLightHSLParts['secondary-h'], 'secondary-s': '30%', 'secondary-l': '30%',
  'secondary-foreground-h': '0', 'secondary-foreground-s': '0%', 'secondary-foreground-l': '90%',

  'accent-h': oceanLightHSLParts['accent-h'], 'accent-s': '70%', 'accent-l': '45%',
  'accent-foreground-h': '0', 'accent-foreground-s': '0%', 'accent-foreground-l': '10%',

  // === Nötr Renk Skalası (Koyu Tema - Okyanus) ===
  // H ve S değerleri açık temadan miras alınır, sadece L değişir.
  'neutral-default-h': oceanLightHSLParts['neutral-default-h'],
  'neutral-default-s': oceanLightHSLParts['neutral-default-s'],
  'neutral-0-l': '8%',
  'neutral-50-l': '12%',
  'neutral-100-l': '18%',
  'neutral-200-l': '25%',
  'neutral-300-l': '30%',
  'neutral-400-l': '40%',
  'neutral-500-l': '50%',
  'neutral-600-l': '60%',
  'neutral-700-l': '70%',
  'neutral-800-l': '80%',
  'neutral-900-l': '90%',
  'neutral-950-l': '97%',

  // === Durum Renkleri (Koyu Tema - Okyanus) ===
  'success-h': oceanLightHSLParts['success-h'], 'success-s': '50%', 'success-l': '65%',
  'success-foreground-h': '0', 'success-foreground-s': '0%', 'success-foreground-l': '10%',
  'warning-h': oceanLightHSLParts['warning-h'], 'warning-s': '75%', 'warning-l': '60%',
  'warning-foreground-h': '0', 'warning-foreground-s': '0%', 'warning-foreground-l': '10%',
  'destructive-h': oceanLightHSLParts['destructive-h'], 'destructive-s': '60%', 'destructive-l': '60%',
  'destructive-foreground-h': '0', 'destructive-foreground-s': '0%', 'destructive-foreground-l': '100%',
  'info-h': oceanLightHSLParts['info-h'], 'info-s': '60%', 'info-l': '65%',
  'info-foreground-h': '0', 'info-foreground-s': '0%', 'info-foreground-l': '10%',
};