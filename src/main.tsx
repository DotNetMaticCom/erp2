import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { NewThemeProvider } from './themes'; // ThemeProvider importu
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NewThemeProvider
      defaultTheme="default-light" // Varsayılan tema adı
      storageKey="theme-preference"    // localStorage anahtarı
      respectSystemPreference={true} // Sistem tercihine saygı
    >
      <App />
    </NewThemeProvider>
  </StrictMode>
);
