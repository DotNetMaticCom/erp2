import { useTheme } from '../../themes';

export default function ThemeTestControls() {
  const { setTheme, toggleDarkMode, currentThemeConfig, themes } = useTheme();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'rgba(255,255,255,0.9)',
        padding: '10px',
        border: '1px solid #ccc',
        zIndex: 9999,
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      }}
    >
      <h4>Tema Test Kontrolleri</h4>
      <p style={{ margin: '5px 0' }}>
        Mevcut Tema: <strong>{currentThemeConfig.displayName}</strong> ({currentThemeConfig.isDark ? 'Koyu' : 'Açık'})
      </p>
      <button onClick={toggleDarkMode} style={{ marginRight: '10px', padding: '5px 10px' }}>
        Açık/Koyu Değiştir
      </button>
      <select value={currentThemeConfig.name} onChange={(e) => setTheme(e.target.value)} style={{ padding: '5px' }}>
        {themes.map((theme) => (
          <option key={theme.name} value={theme.name}>
            {theme.displayName}
          </option>
        ))}
      </select>
    </div>
  );
}
