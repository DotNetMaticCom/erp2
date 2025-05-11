/**
 * Default Tema Değişkenleri
 * ------------------------
 * Bu dosya, default temanın tüm değişkenlerini (renkler, yazı tipleri, boşluklar vs.) tanımlar.
 * Yeni temalar bu değişkenleri genişletebilir veya üzerine yazabilir.
 */


export const defaultFonts = {
  // Ana yazı tipi
  fontFamily: {
    base: "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    heading: "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  
  // Yazı boyutları
  fontSize: {
    xs: "0.75rem",     // 12px
    sm: "0.875rem",    // 14px
    base: "1rem",      // 16px
    lg: "1.125rem",    // 18px
    xl: "1.25rem",     // 20px
    "2xl": "1.5rem",   // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem",  // 36px
    "5xl": "3rem",     // 48px
  },
  
  // Satır aralıkları
  lineHeight: {
    tight: "1.15",
    snug: "1.25",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
  
  // Yazı tipi kalınlıkları
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
};

export const defaultSpacing = {
  // Boşluk birimleri
  "0": "0",
  "0.5": "0.125rem", // 2px
  "1": "0.25rem",    // 4px
  "2": "0.5rem",     // 8px
  "3": "0.75rem",    // 12px
  "4": "1rem",       // 16px
  "5": "1.25rem",    // 20px
  "6": "1.5rem",     // 24px
  "8": "2rem",       // 32px
  "10": "2.5rem",    // 40px
  "12": "3rem",      // 48px
  "16": "4rem",      // 64px
  "20": "5rem",      // 80px
  "24": "6rem",      // 96px
};

export const defaultBorderRadius = {
  none: "0",
  xs: "0.125rem",    // 2px
  sm: "0.25rem",     // 4px
  md: "0.375rem",    // 6px
  lg: "0.5rem",      // 8px
  xl: "0.75rem",     // 12px
  "2xl": "1rem",     // 16px
  full: "9999px",
};

export const defaultShadows = {
  card: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 0px 1px rgba(0, 0, 0, 0.07)",
  cardHover: "0px 3px 6px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
  sidebar: "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.08)",
  dropdown: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
  modal: "0px 20px 25px -5px rgba(0, 0, 0, 0.15), 0px 10px 10px -5px rgba(0, 0, 0, 0.06)",
  inner: "inset 0px 2px 4px rgba(0, 0, 0, 0.07)",
};

export const defaultTransitions = {
  fast: "150ms ease-out",
  base: "200ms ease-out",
  slow: "300ms ease-out",
};
