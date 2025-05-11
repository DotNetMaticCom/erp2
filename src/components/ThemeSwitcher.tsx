import React from 'react';
import { useTheme } from '../themes/ThemeProvider';

const ThemeSwitcher: React.FC = () => {
  const { isDarkMode, toggleDarkMode, currentTheme, setTheme } = useTheme();

  return (
    <div className="theme-switcher" style={{ 
      padding: '1rem',
      borderRadius: '0.5rem',
      backgroundColor: 'var(--color-card)',
      color: 'var(--color-card-foreground)',
      boxShadow: 'var(--shadow-card)',
      margin: '1rem',
    }}>
      <h3 style={{ 
        fontSize: 'var(--font-size-lg)',
        fontWeight: 'var(--font-weight-bold)',
        marginBottom: 'var(--spacing-2)'
      }}>
        Tema Ayarları
      </h3>
      <div style={{ marginBottom: 'var(--spacing-4)' }}>
        <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-2)' }}>
          Aktif Tema: <strong>{currentTheme.displayName}</strong>
        </p>
        <button
          className="btn btn-primary"
          onClick={toggleDarkMode}
          style={{ marginRight: 'var(--spacing-2)' }}
        >
          {isDarkMode ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}
        </button>
      </div>
      
      <div>
        <p style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-2)' }}>
          Mevcut Temalar:
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          <button
            className="btn btn-outline"
            onClick={() => setTheme('default-theme')}
          >
            Default Tema
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setTheme('default-dark-theme')}
          >
            Default Koyu Tema
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher; 