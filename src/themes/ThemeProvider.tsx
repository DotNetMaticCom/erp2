// src/themes/ThemeProvider.tsx
import { createContext, useContext, useEffect, useState, useCallback, type ReactNode, useRef } from 'react';
import type { AppThemeConfig, RawThemeHSLParts } from './theme-types'; // Yeni tipler
import { getAppThemeConfig, allAppThemes, saveThemePreference, loadThemePreference, isSystemDarkMode, watchSystemTheme } from './index'; // Merkezi tema yönetimi ve yardımcı fonksiyonlar

// ThemeProviderProps arayüzünü tanımlayın (eğer yoksa)
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string; // Opsiyonel default tema adı
  storageKey?: string; // Opsiyonel storage key
  respectSystemPreference?: boolean; // Opsiyonel sistem tercihine saygı
}

interface ThemeContextType {
  currentThemeConfig: AppThemeConfig;
  setTheme: (themeName: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  themes: AppThemeConfig[]; // Mevcut tüm temaları ekleyelim
}

// Varsayılan başlangıç teması (örneğin, default-light)
const initialDefaultThemeName = 'default-light';
const initialDefaultConfig = getAppThemeConfig(initialDefaultThemeName) || allAppThemes[0];


const ThemeContext = createContext<ThemeContextType>({
  currentThemeConfig: initialDefaultConfig,
  setTheme: () => {},
  isDarkMode: initialDefaultConfig.isDark,
  toggleDarkMode: () => {},
  themes: allAppThemes, // Başlangıç değeri
});

function applyCoreHSLPartsToDOM(hslParts: RawThemeHSLParts) {
  const rootStyle = document.documentElement.style;
  // Önceki tema değişkenlerini temizlemek (opsiyonel ama iyi pratik)
  // Bilinen tüm --tema-* değişkenlerini null yaparak veya her temanın tüm --tema-* değişkenlerini tanımladığından emin olarak.
  // Şimdilik, üzerine yazma varsayımıyla devam edelim.

  // Mevcut --tema ile başlayan tüm değişkenleri temizleyelim (daha güvenli bir yaklaşım)
  // Bu, bir temadan diğerine geçerken eski değişkenlerin kalmasını önler.
  // Ancak, bu performans açısından maliyetli olabilir, dikkatli kullanılmalı.
  // Alternatif olarak, her temanın TÜM --tema-* değişkenlerini tanımladığından emin olun.
  // Şimdilik basit tutalım ve sadece üzerine yazalım. Gerekirse bu kısım geliştirilebilir.

  for (const key in hslParts) {
    if (Object.prototype.hasOwnProperty.call(hslParts, key)) {
      const value = hslParts[key];
      if (value !== undefined) { // Sadece tanımlı değerleri ata
        const cssVarName = `--tema-${key}`;
        // RawThemeHSLParts'daki key'ler 'primary-h' formatında, CSS değişkenleri '--tema-primary-h' olmalı
        rootStyle.setProperty(cssVarName, value);
      }
    }
  }
}

// NewThemeProvider adını ThemeProvider olarak değiştirebilirsiniz veya NewThemeProvider olarak kalabilir.
// Kullanıcı isteğinde NewThemeProvider olarak belirtilmiş.
export function NewThemeProvider({
  children,
  defaultTheme: propDefaultTheme = initialDefaultThemeName, // props'tan gelen defaultTheme
  storageKey = 'theme-preference', // props'tan gelen storageKey
  respectSystemPreference = true, // props'tan gelen respectSystemPreference
}: ThemeProviderProps) {
  const [currentThemeConfig, setCurrentThemeConfig] = useState<AppThemeConfig>(() => {
    const savedThemeName = loadThemePreference(); // storageKey kullanılabilir
    if (savedThemeName) {
      const theme = getAppThemeConfig(savedThemeName) || initialDefaultConfig;
      return theme;
    }
    const theme = getAppThemeConfig(propDefaultTheme) || initialDefaultConfig;
    return theme;
  });

  const activeThemeNameRef = useRef<string | null>(null);

  const setActiveTheme = useCallback((newConfig: AppThemeConfig) => {
    
    const newThemeClassName = `theme-${newConfig.name}`;

    const rootClassList = document.documentElement.classList;

    // Bu sağlayıcı tarafından yönetilen tüm tema sınıflarını kaldır
    // Bu, setimizden yalnızca bir 'theme-*' sınıfının etkin olmasını sağlar.
    allAppThemes.forEach(theme => {
      rootClassList.remove(`theme-${theme.name}`);
    });

    // Yeni tema sınıfını ekle
    rootClassList.add(newThemeClassName);
    activeThemeNameRef.current = newThemeClassName; // Şu anda aktif olan tema sınıfına ref'i güncelle

    // .dark sınıfını yönet
    if (newConfig.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    

    applyCoreHSLPartsToDOM(newConfig.coreHSLParts);

    saveThemePreference(newConfig.name); // storageKey kullanılabilir
    setCurrentThemeConfig(newConfig);
  }, []);


  useEffect(() => {
    const savedThemeName = loadThemePreference(); // storageKey kullanılabilir
    const systemPrefersDark = isSystemDarkMode();
    let themeToLoad: AppThemeConfig | undefined;


    if (savedThemeName) {
      themeToLoad = getAppThemeConfig(savedThemeName);
    } else if (respectSystemPreference && systemPrefersDark) {
      const darkVersionName = propDefaultTheme.includes('-light')
        ? propDefaultTheme.replace('-light', '-dark')
        : `${propDefaultTheme}-dark`;
      themeToLoad = allAppThemes.find(t => t.name === darkVersionName && t.isDark) || allAppThemes.find(t => t.isDark);
    }

    const finalThemeToLoad = themeToLoad || getAppThemeConfig(propDefaultTheme) || initialDefaultConfig;
    setActiveTheme(finalThemeToLoad);

    let unwatch: (() => void) | undefined;
    if (respectSystemPreference && !savedThemeName) {
      unwatch = watchSystemTheme((isDark) => {
        if (!loadThemePreference()) { // Kullanıcı manuel seçim yapmadıysa
            const currentBaseName = currentThemeConfig.name.replace(currentThemeConfig.isDark ? "-dark" : "-light", "");
            const newSystemThemeName = isDark ? `${currentBaseName}-dark` : `${currentBaseName}-light`;
            let newSystemThemeConfig = getAppThemeConfig(newSystemThemeName);

            if (!newSystemThemeConfig) { // Eğer spesifik light/dark versiyonu yoksa, genel bir tane bul
                 newSystemThemeConfig = isDark
                    ? allAppThemes.find(t => t.isDark)
                    : allAppThemes.find(t => !t.isDark);
            }
            setActiveTheme(newSystemThemeConfig || initialDefaultConfig);
        } else {
        }
      });
    }
    return () => {
        if (unwatch) {
            unwatch();
        }
    };
  // Bağımlılıkları basitleştirelim. setActiveTheme useCallback ile sarmalandığı için genellikle değişmez.
  // currentThemeConfig'e bağlı olmak burada döngüye neden olabilir.
  // Bu useEffect'in amacı başlangıç temasını ve sistem tercihini ayarlamaktır, bu yüzden sadece props değiştiğinde çalışmalı.
  }, [propDefaultTheme, respectSystemPreference, setActiveTheme]); // Basitleştirilmiş bağımlılıklar

  const setThemeByName = useCallback((themeName: string) => {
    const newConfig = getAppThemeConfig(themeName);
    if (newConfig) {
      setActiveTheme(newConfig);
    } else {
      console.warn(`[ThemeProvider] Tema bulunamadı: ${themeName}`);
    }
  }, [setActiveTheme]);

  const toggleDarkMode = useCallback(() => {
    const currentBaseName = currentThemeConfig.name.replace(currentThemeConfig.isDark ? "-dark" : "-light", "");
    const targetThemeName = currentThemeConfig.isDark ? `${currentBaseName}-light` : `${currentBaseName}-dark`;

    let targetConfig = getAppThemeConfig(targetThemeName);

    if (!targetConfig) {
        targetConfig = currentThemeConfig.isDark
            ? allAppThemes.find(t => t.name.startsWith(currentBaseName) && !t.isDark) || allAppThemes.find(t => !t.isDark && !t.name.startsWith(currentBaseName))
            : allAppThemes.find(t => t.name.startsWith(currentBaseName) && t.isDark) || allAppThemes.find(t => t.isDark && !t.name.startsWith(currentBaseName));
    }
    
    if (!targetConfig && currentThemeConfig.isDark) { // Genel bir açık tema bul
        targetConfig = allAppThemes.find(t => !t.isDark) || initialDefaultConfig;
    } else if (!targetConfig && !currentThemeConfig.isDark) { // Genel bir koyu tema bul
        targetConfig = allAppThemes.find(t => t.isDark) || initialDefaultConfig;
    }

    if (targetConfig) {
      setActiveTheme(targetConfig);
    } else {
        console.warn(`[ThemeProvider] toggleDarkMode: Geçiş yapılacak uygun tema bulunamadı. Mevcut: ${currentThemeConfig.name}. Fallback uygulanıyor.`);
        // Fallback olarak ilk temayı veya default temayı set edebilirsiniz.
        setActiveTheme(initialDefaultConfig);
    }
  }, [currentThemeConfig, setActiveTheme]);

  return (
    <ThemeContext.Provider value={{ currentThemeConfig, setTheme: setThemeByName, isDarkMode: currentThemeConfig.isDark, toggleDarkMode, themes: allAppThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a NewThemeProvider');
  }
  return context;
};

// ThemeInitializer gibi bir bileşen varsa ve artık gerekmiyorsa kaldırılabilir
// veya NewThemeProvider'ın başlangıç mantığına entegre edilebilir.
// Şimdilik ThemeInitializer'ı olduğu gibi bırakabilir veya kaldırabilirsiniz.
// Kullanıcı isteğinde ThemeInitializer'dan bahsedilmemiş, bu yüzden ona dokunmuyoruz.