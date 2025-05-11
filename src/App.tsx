import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { NewThemeProvider } from "./themes/ThemeProvider";
import { useTheme } from './themes'; // useTheme hook'unu import edin

const queryClient = new QueryClient();

const future = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

// Tema Test Kontrolleri Bileşeni
function ThemeTestControls() {
  const { setTheme, toggleDarkMode, currentThemeConfig, themes } = useTheme();

  return (
    <div style={{ position: 'fixed', bottom: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', padding: '10px', border: '1px solid #ccc', zIndex: 9999, borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
      <h4>Tema Test Kontrolleri</h4>
      <p style={{ margin: '5px 0' }}>Mevcut Tema: <strong>{currentThemeConfig.displayName}</strong> ({currentThemeConfig.isDark ? 'Koyu' : 'Açık'})</p>
      <button onClick={toggleDarkMode} style={{ marginRight: '10px', padding: '5px 10px' }}>
        Açık/Koyu Değiştir
      </button>
      <select
        value={currentThemeConfig.name}
        onChange={(e) => setTheme(e.target.value)}
        style={{ padding: '5px' }}
      >
        {themes.map(theme => (
          <option key={theme.name} value={theme.name}>
            {theme.displayName}
          </option>
        ))}
      </select>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NewThemeProvider defaultTheme="default-theme" respectSystemPreference={true}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={future}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        {/* Geçici Test Kontrolleri */}
        <ThemeTestControls />
      </TooltipProvider>
    </NewThemeProvider>
  </QueryClientProvider>
);

export default App;
