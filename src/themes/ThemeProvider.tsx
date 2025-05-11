// src/themes/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode, useRef } from 'react'; // ReactNode ve useRef eklendi
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
  console.log('[ThemeProvider] applyCoreHSLPartsToDOM çağrıldı. HSL Parçaları:', hslParts);
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
        console.log(`[ThemeProvider] DOM'a yazıldı: ${cssVarName} = ${value}`);
      }
    }
  }
}

// NewThemeProvider adını ThemeProvider olarak değiştirebilirsiniz veya NewThemeProvider olarak kalabilir.
// Kullanıcı isteğinde NewThemeProvider olarak belirtilmiş.
export const NewThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme: propDefaultTheme = initialDefaultThemeName, // props'tan gelen defaultTheme
  storageKey = 'theme-preference', // props'tan gelen storageKey
  respectSystemPreference = true, // props'tan gelen respectSystemPreference
}) => {
  console.log('[ThemeProvider] NewThemeProvider başlatılıyor. Props:', { propDefaultTheme, storageKey, respectSystemPreference });
  const [currentThemeConfig, setCurrentThemeConfig] = useState<AppThemeConfig>(() => {
    const savedThemeName = loadThemePreference(); // storageKey kullanılabilir
    console.log('[ThemeProvider] useState initial. Kayıtlı tema adı:', savedThemeName);
    if (savedThemeName) {
      const theme = getAppThemeConfig(savedThemeName) || initialDefaultConfig;
      console.log('[ThemeProvider] useState initial. Kayıtlı temadan yüklendi:', theme.name);
      return theme;
    }
    const theme = getAppThemeConfig(propDefaultTheme) || initialDefaultConfig;
    console.log('[ThemeProvider] useState initial. Varsayılan (prop) temadan yüklendi:', theme.name);
    return theme;
  });

  const activeThemeNameRef = useRef<string | null>(null);

  const setActiveTheme = useCallback((newConfig: AppThemeConfig) => {
    console.log(`[ThemeProvider] setActiveTheme çağrıldı. Yeni tema: ${newConfig.name}, Koyu Mod: ${newConfig.isDark}`);
    
    const newThemeClassName = `theme-${newConfig.name}`;

    const rootClassList = document.documentElement.classList;

    // Bu sağlayıcı tarafından yönetilen tüm tema sınıflarını kaldır
    // Bu, setimizden yalnızca bir 'theme-*' sınıfının etkin olmasını sağlar.
    allAppThemes.forEach(theme => {
      rootClassList.remove(`theme-${theme.name}`);
    });
    console.log('[ThemeProvider] Tüm bilinen `theme-*` sınıfları kaldırıldı (denendi).');

    // Yeni tema sınıfını ekle
    rootClassList.add(newThemeClassName);
    activeThemeNameRef.current = newThemeClassName; // Şu anda aktif olan tema sınıfına ref'i güncelle
    console.log(`[ThemeProvider] Yeni tema sınıfı eklendi: ${newThemeClassName}`);

    // .dark sınıfını yönet
    if (newConfig.isDark) {
      document.documentElement.classList.add('dark');
      console.log('[ThemeProvider] .dark sınıfı eklendi.');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('[ThemeProvider] .dark sınıfı kaldırıldı.');
    }
    
    console.log(`[ThemeProvider] document.documentElement.classList güncellendi: '${Array.from(document.documentElement.classList).join(' ')}'`);

    applyCoreHSLPartsToDOM(newConfig.coreHSLParts);

    saveThemePreference(newConfig.name); // storageKey kullanılabilir
    console.log(`[ThemeProvider] Tema tercihi kaydedildi: ${newConfig.name}`);
    setCurrentThemeConfig(newConfig);
    console.log('[ThemeProvider] currentThemeConfig güncellendi:', newConfig.name);
  }, []);


  useEffect(() => {
    console.log('[ThemeProvider] Ana useEffect tetiklendi. Bağımlılıklar:', { propDefaultTheme, respectSystemPreference, currentThemeName: currentThemeConfig.name, currentThemeIsDark: currentThemeConfig.isDark });
    const savedThemeName = loadThemePreference(); // storageKey kullanılabilir
    const systemPrefersDark = isSystemDarkMode();
    let themeToLoad: AppThemeConfig | undefined;
    console.log('[ThemeProvider] useEffect: Kayıtlı tema:', savedThemeName, 'Sistem koyu modu tercih ediyor mu?:', systemPrefersDark);


    if (savedThemeName) {
      themeToLoad = getAppThemeConfig(savedThemeName);
      console.log('[ThemeProvider] useEffect: Kayıtlı tema yüklenecek:', themeToLoad?.name);
    } else if (respectSystemPreference && systemPrefersDark) {
      const darkVersionName = propDefaultTheme.includes('-light')
        ? propDefaultTheme.replace('-light', '-dark')
        : `${propDefaultTheme}-dark`;
      themeToLoad = allAppThemes.find(t => t.name === darkVersionName && t.isDark) || allAppThemes.find(t => t.isDark);
      console.log('[ThemeProvider] useEffect: Sistem tercihi (koyu) için tema yüklenecek:', themeToLoad?.name, '(Aranan:', darkVersionName, ')');
    }

    const finalThemeToLoad = themeToLoad || getAppThemeConfig(propDefaultTheme) || initialDefaultConfig;
    console.log('[ThemeProvider] useEffect: Son yüklenecek tema:', finalThemeToLoad.name);
    setActiveTheme(finalThemeToLoad);

    let unwatch: (() => void) | undefined;
    if (respectSystemPreference && !savedThemeName) {
      console.log('[ThemeProvider] useEffect: Sistem teması değişiklikleri izleniyor.');
      unwatch = watchSystemTheme((isDark) => {
        console.log(`[ThemeProvider] Sistem teması değişti. Yeni durum (koyu mu?): ${isDark}`);
        if (!loadThemePreference()) { // Kullanıcı manuel seçim yapmadıysa
            console.log('[ThemeProvider] Kullanıcı manuel seçim yapmamış, sistem teması uygulanacak.');
            const currentBaseName = currentThemeConfig.name.replace(currentThemeConfig.isDark ? "-dark" : "-light", "");
            const newSystemThemeName = isDark ? `${currentBaseName}-dark` : `${currentBaseName}-light`;
            let newSystemThemeConfig = getAppThemeConfig(newSystemThemeName);
            console.log(`[ThemeProvider] Sistem için yeni tema adı denemesi: ${newSystemThemeName}, Bulunan: ${newSystemThemeConfig?.name}`);

            if (!newSystemThemeConfig) { // Eğer spesifik light/dark versiyonu yoksa, genel bir tane bul
                 newSystemThemeConfig = isDark
                    ? allAppThemes.find(t => t.isDark)
                    : allAppThemes.find(t => !t.isDark);
                console.log(`[ThemeProvider] Spesifik versiyon bulunamadı, genel ${isDark ? 'koyu' : 'açık'} tema arandı: ${newSystemThemeConfig?.name}`);
            }
            setActiveTheme(newSystemThemeConfig || initialDefaultConfig);
        } else {
            console.log('[ThemeProvider] Kullanıcı manuel seçim yapmış, sistem teması değişikliği göz ardı edildi.');
        }
      });
    }
    return () => {
        if (unwatch) {
            console.log('[ThemeProvider] useEffect temizleniyor, sistem teması izleyicisi kaldırılıyor.');
            unwatch();
        }
    };
  // Bağımlılıkları basitleştirelim. setActiveTheme useCallback ile sarmalandığı için genellikle değişmez.
  // currentThemeConfig'e bağlı olmak burada döngüye neden olabilir.
  // Bu useEffect'in amacı başlangıç temasını ve sistem tercihini ayarlamaktır, bu yüzden sadece props değiştiğinde çalışmalı.
  }, [propDefaultTheme, respectSystemPreference, setActiveTheme]); // Basitleştirilmiş bağımlılıklar

  const setThemeByName = useCallback((themeName: string) => {
    console.log(`[ThemeProvider] setThemeByName çağrıldı. İstenen tema: ${themeName}`);
    const newConfig = getAppThemeConfig(themeName);
    if (newConfig) {
      setActiveTheme(newConfig);
    } else {
      console.warn(`[ThemeProvider] Tema bulunamadı: ${themeName}`);
    }
  }, [setActiveTheme]);

  const toggleDarkMode = useCallback(() => {
    console.log(`[ThemeProvider] toggleDarkMode çağrıldı. Mevcut tema: ${currentThemeConfig.name}, Koyu Mod: ${currentThemeConfig.isDark}`);
    const currentBaseName = currentThemeConfig.name.replace(currentThemeConfig.isDark ? "-dark" : "-light", "");
    const targetThemeName = currentThemeConfig.isDark ? `${currentBaseName}-light` : `${currentBaseName}-dark`;
    console.log(`[ThemeProvider] Hedeflenen tema adı (ilk deneme): ${targetThemeName}`);

    let targetConfig = getAppThemeConfig(targetThemeName);

    if (!targetConfig) {
        console.log(`[ThemeProvider] '${targetThemeName}' bulunamadı, alternatifler aranıyor.`);
        targetConfig = currentThemeConfig.isDark
            ? allAppThemes.find(t => t.name.startsWith(currentBaseName) && !t.isDark) || allAppThemes.find(t => !t.isDark && !t.name.startsWith(currentBaseName))
            : allAppThemes.find(t => t.name.startsWith(currentBaseName) && t.isDark) || allAppThemes.find(t => t.isDark && !t.name.startsWith(currentBaseName));
        console.log(`[ThemeProvider] Alternatif arama sonucu (aynı baz isimli farklı mod): ${targetConfig?.name}`);
    }
    
    if (!targetConfig && currentThemeConfig.isDark) { // Genel bir açık tema bul
        console.log(`[ThemeProvider] Hala hedef bulunamadı, genel bir açık tema aranıyor.`);
        targetConfig = allAppThemes.find(t => !t.isDark) || initialDefaultConfig;
        console.log(`[ThemeProvider] Genel açık tema arama sonucu: ${targetConfig?.name}`);
    } else if (!targetConfig && !currentThemeConfig.isDark) { // Genel bir koyu tema bul
        console.log(`[ThemeProvider] Hala hedef bulunamadı, genel bir koyu tema aranıyor.`);
        targetConfig = allAppThemes.find(t => t.isDark) || initialDefaultConfig;
        console.log(`[ThemeProvider] Genel koyu tema arama sonucu: ${targetConfig?.name}`);
    }

    if (targetConfig) {
      console.log(`[ThemeProvider] toggleDarkMode: Hedef tema bulundu ve ayarlanacak: ${targetConfig.name}`);
      setActiveTheme(targetConfig);
    } else {
        console.warn(`[ThemeProvider] toggleDarkMode: Geçiş yapılacak uygun tema bulunamadı. Mevcut: ${currentThemeConfig.name}. Fallback uygulanıyor.`);
        // Fallback olarak ilk temayı veya default temayı set edebilirsiniz.
        setActiveTheme(initialDefaultConfig);
    }
  }, [currentThemeConfig, setActiveTheme]);

  console.log(`[ThemeProvider] Render. Mevcut tema: ${currentThemeConfig.name}, Koyu Mod: ${currentThemeConfig.isDark}`);
  return (
    <ThemeContext.Provider value={{ currentThemeConfig, setTheme: setThemeByName, isDarkMode: currentThemeConfig.isDark, toggleDarkMode, themes: allAppThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

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