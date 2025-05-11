// src/themes/default-theme/default-hsl-parts.ts
import type { RawThemeHSLParts } from '../theme-types';

export const defaultLightHSLParts: RawThemeHSLParts = {
  // === Çekirdek Renkler (Açık Tema) ===
  'primary-h': '0', 'primary-s': '0%', 'primary-l': '20%',         // Eski: 0 0% 20% (#333333)
  'primary-foreground-l': '100%',

  'secondary-h': '0', 'secondary-s': '0%', 'secondary-l': '95%',       // Eski: 0 0% 95% (#f2f2f2)
  'secondary-foreground-l': '20%',

  'accent-h': '0', 'accent-s': '0%', 'accent-l': '30%',          // Eski: 0 0% 30% (#4d4d4d)
  'accent-foreground-l': '100%',

  // === Nötr Renk Skalası (Açık Tema) ===
  // Örnek: Gri tonları için H ve S genellikle 0'dır veya düşük bir doygunluktadır.
  'neutral-default-h': '0',
  'neutral-default-s': '0%',
  'neutral-0-l': '100%',   // Beyaz
  'neutral-50-l': '98%',  // Çok açık gri
  'neutral-100-l': '96%', // Açık gri (eski muted)
  'neutral-200-l': '93%', // Kenarlık için (eski border/input)
  'neutral-300-l': '85%', // Eski border
  'neutral-400-l': '70%',
  'neutral-500-l': '60%', // Eski primary-muted
  'neutral-600-l': '40%', // Eski muted-foreground
  'neutral-700-l': '30%',
  'neutral-800-l': '20%',
  'neutral-900-l': '10%', // Eski foreground
  'neutral-950-l': '5%',    // Çok koyu gri / Siyah

  // === Durum Renkleri (Açık Tema) ===
  'success-h': '145', 'success-s': '63%', 'success-l': '42%',
  'success-foreground-l': '100%',
  'warning-h': '40', 'warning-s': '90%', 'warning-l': '55%',
  'warning-foreground-l': '10%',
  'destructive-h': '0', 'destructive-s': '72%', 'destructive-l': '51%',
  'destructive-foreground-l': '100%',
  'info-h': '200', 'info-s': '90%', 'info-l': '50%',
  'info-foreground-l': '100%',
};

export const defaultDarkHSLParts: RawThemeHSLParts = {
  // === Çekirdek Renkler (Koyu Tema Override) ===
  'primary-h': '0', 'primary-s': '0%', 'primary-l': '80%', // Eski: 0 0% 70%
  'primary-foreground-l': '10%',

  'secondary-h': '0', 'secondary-s': '0%', 'secondary-l': '15%', // Eski: 0 0% 20%
  'secondary-foreground-l': '85%',

  'accent-h': '0', 'accent-s': '0%', 'accent-l': '70%',   // Eski: 0 0% 60%
  'accent-foreground-l': '10%',

  // === Nötr Renk Skalası (Koyu Tema Override) ===
  'neutral-default-h': '0',
  'neutral-default-s': '0%',
  'neutral-0-l': '5%',    // Koyu modda en koyu
  'neutral-50-l': '8%',   // Eski background
  'neutral-100-l': '12%', // Eski card/popover/input
  'neutral-200-l': '15%', // Eski muted
  'neutral-300-l': '20%', // Eski border
  'neutral-400-l': '30%', // Açık tema L değerinin tersine yakın
  'neutral-500-l': '40%', // Açık tema L değerinin tersine yakın
  'neutral-600-l': '60%', // Açık tema L değerinin tersine yakın
  'neutral-700-l': '70%', // Açık tema L değerinin tersine yakın
  'neutral-800-l': '85%',
  'neutral-900-l': '90%', // Eski foreground
  'neutral-950-l': '98%', // Koyu modda en açık

  // === Durum Renkleri (Koyu Tema Override) ===
  'success-h': '145', 'success-s': '60%', 'success-l': '70%',
  'success-foreground-l': '10%',
  'warning-h': '40', 'warning-s': '85%', 'warning-l': '75%',
  'warning-foreground-l': '10%',
  'destructive-h': '0', 'destructive-s': '70%', 'destructive-l': '70%',
  'destructive-foreground-l': '10%', // Veya %100 beyaz
  'info-h': '200', 'info-s': '85%', 'info-l': '75%',
  'info-foreground-l': '10%',
};