import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        // Semantik CSS değişkenlerine eşleme
        // Not: <alpha-value> Tailwind'in opaklık desteği için önemlidir.
        // Doğrudan --tema-* HSL parça değişkenlerini kullanıyoruz.
        // ThemeProvider açık/koyu moda göre bu --tema-* değerlerini güncelleyecektir.
        // Örn: Açık modda --tema-neutral-50-l: 98%; Koyu modda --tema-neutral-900-l: 10%;
        // Bu sayede Tailwind renkleri dinamik olarak doğru HSL değerlerini alacaktır.

        'background': 'hsl(var(--tema-neutral-50-h) var(--tema-neutral-50-s) var(--tema-neutral-50-l) / <alpha-value>)', // Açık tema için --renk-arkaplan-sayfa -> --renk-neutral-50. Koyu tema için ThemeProvider --tema-neutral-900-* değerlerini ayarlar.
        'foreground': 'hsl(var(--tema-neutral-900-h) var(--tema-neutral-900-s) var(--tema-neutral-900-l) / <alpha-value>)', // Açık tema için --renk-metin-ana -> --renk-neutral-900. Koyu tema için ThemeProvider --tema-neutral-100-* değerlerini ayarlar.
        
        'muted': { // --renk-arkaplan-soluk ve --renk-metin-soluk
          DEFAULT: 'hsl(var(--tema-neutral-100-h) var(--tema-neutral-100-s) var(--tema-neutral-100-l) / <alpha-value>)', // Açık: --renk-neutral-100. Koyu: --renk-neutral-800'den biraz açık (ThemeProvider ayarlar)
          foreground: 'hsl(var(--tema-neutral-600-h) var(--tema-neutral-600-s) var(--tema-neutral-600-l) / <alpha-value>)', // Açık: --renk-neutral-600. Koyu: --renk-neutral-400 (ThemeProvider ayarlar)
        },
        'card': { // --renk-arkaplan-kart ve --renk-metin-kart-uzerine
          DEFAULT: 'hsl(var(--tema-neutral-0-h) var(--tema-neutral-0-s) var(--tema-neutral-0-l) / <alpha-value>)', // Açık: --renk-neutral-0. Koyu: --renk-neutral-800 (ThemeProvider ayarlar)
          foreground: 'hsl(var(--tema-neutral-900-h) var(--tema-neutral-900-s) var(--tema-neutral-900-l) / <alpha-value>)', // Açık: --renk-metin-ana. Koyu: --renk-metin-ana (ThemeProvider ayarlar)
        },
        'popover': {
          DEFAULT: 'hsl(var(--tema-neutral-0-h) var(--tema-neutral-0-s) var(--tema-neutral-0-l) / <alpha-value>)',
          foreground: 'hsl(var(--tema-neutral-900-h) var(--tema-neutral-900-s) var(--tema-neutral-900-l) / <alpha-value>)',
        },
        'primary': {
          DEFAULT: 'hsl(var(--tema-primary-h) var(--tema-primary-s) var(--tema-primary-l) / <alpha-value>)',
          foreground: 'hsl(var(--tema-primary-foreground-h) var(--tema-primary-foreground-s) var(--tema-primary-foreground-l) / <alpha-value>)',
        },
        'secondary': {
          DEFAULT: 'hsl(var(--tema-secondary-h) var(--tema-secondary-s) var(--tema-secondary-l) / <alpha-value>)',
          foreground: 'hsl(var(--tema-secondary-foreground-h) var(--tema-secondary-foreground-s) var(--tema-secondary-foreground-l) / <alpha-value>)',
        },
        'accent': {
          DEFAULT: 'hsl(var(--tema-accent-h) var(--tema-accent-s) var(--tema-accent-l) / <alpha-value>)',
          foreground: 'hsl(var(--tema-accent-foreground-h) var(--tema-accent-foreground-s) var(--tema-accent-foreground-l) / <alpha-value>)',
        },
        'border': 'hsl(var(--tema-neutral-300-h) var(--tema-neutral-300-s) var(--tema-neutral-300-l) / <alpha-value>)', // Açık: --renk-neutral-300. Koyu: --renk-neutral-700 (ThemeProvider ayarlar)
        'input': 'hsl(var(--tema-neutral-100-h) var(--tema-neutral-100-s) var(--tema-neutral-100-l) / <alpha-value>)', // Açık: --renk-neutral-100. Koyu: --renk-neutral-800 (ThemeProvider ayarlar)
        'ring': 'hsl(var(--tema-primary-h) var(--tema-primary-s) var(--tema-primary-l) / <alpha-value>)',

        // Durum renkleri
        'success': {
          DEFAULT: 'hsl(var(--tema-success-h) var(--tema-success-s) var(--tema-success-l) / <alpha-value>)',
          foreground: 'hsl(var(--tema-success-foreground-h) var(--tema-success-foreground-s) var(--tema-success-foreground-l) / <alpha-value>)',
        },
        'warning': {
          DEFAULT: 'hsl(var(--tema-warning-h) var(--tema-warning-s) var(--tema-warning-l) / <alpha-value>)',
          foreground: 'hsl(var(--tema-warning-foreground-h) var(--tema-warning-foreground-s) var(--tema-warning-foreground-l) / <alpha-value>)',
        },
        'destructive': {
          DEFAULT: 'hsl(var(--tema-destructive-h) var(--tema-destructive-s) var(--tema-destructive-l) / <alpha-value>)',
          foreground: 'hsl(var(--tema-destructive-foreground-h) var(--tema-destructive-foreground-s) var(--tema-destructive-foreground-l) / <alpha-value>)',
        },
        'info': {
          DEFAULT: 'hsl(var(--tema-info-h) var(--tema-info-s) var(--tema-info-l) / <alpha-value>)',
          foreground: 'hsl(var(--tema-info-foreground-h) var(--tema-info-foreground-s) var(--tema-info-foreground-l) / <alpha-value>)',
        },
      },
      borderRadius: {
        'xs': 'var(--radius-xs)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        'full': '9999px',
      },
      fontSize: {
        'xs': 'var(--text-xs)',
        'sm': 'var(--text-sm)',
        'base': 'var(--text-base)',
        'lg': 'var(--text-lg)',
        'xl': 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
      },
      lineHeight: {
        'tight': 'var(--leading-tight)',
        'snug': 'var(--leading-snug)',
        'normal': 'var(--leading-normal)',
        'relaxed': 'var(--leading-relaxed)',
        'loose': 'var(--leading-loose)',
      },
      spacing: {
        // We keep the default Tailwind spacing scale
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'sidebar': 'var(--shadow-sidebar)',
        'dropdown': 'var(--shadow-dropdown)',
        'modal': 'var(--shadow-modal)',
        'inner': 'var(--shadow-inner)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(5px)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'slide-in': {
          from: {
            transform: 'translateX(-10px)',
            opacity: '0'
          },
          to: {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'slide-out': {
          from: {
            transform: 'translateX(0)',
            opacity: '1'
          },
          to: {
            transform: 'translateX(-10px)',
            opacity: '0'
          }
        },
        'scale-in': {
          from: {
            transform: 'scale(0.95)',
            opacity: '0'
          },
          to: {
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        'scale-out': {
          from: { 
            transform: 'scale(1)', 
            opacity: '1' 
          },
          to: { 
            transform: 'scale(0.95)', 
            opacity: '0' 
          }
        },
        'pulse': {
          '0%, 100%': { 
            opacity: '1' 
          },
          '50%': { 
            opacity: '0.5' 
          },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-in': 'slide-in 0.2s ease-out',
        'slide-out': 'slide-out 0.2s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'scale-out': 'scale-out 0.2s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionDuration: {
        '50': '50ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
      },
      fontFamily: {
        sans: ['Inter', 'var(--font-family-base)', ...defaultTheme.fontFamily.sans],
        mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', 'monospace']
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
