import * as React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/manrope/300.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/600.css';
import '@fontsource/playfair-display/400-italic.css';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);

const FontLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    const loadFonts = async () => {
      try {
        await Promise.all([
          document.fonts.load('400 1em Manrope'),
          document.fonts.load('500 1em Manrope'),
          document.fonts.load('600 1em Manrope'),
          document.fonts.load('700 1em Manrope'),
          document.fonts.load('400 1em "Playfair Display"'),
          document.fonts.load('600 1em "Playfair Display"'),
        ]);
      } catch {}
      if (mounted) setReady(true);
    };

    loadFonts();

    const timeout = setTimeout(() => {
      if (mounted) setReady(true);
    }, 1500);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, []);

  if (!ready) {
    return null;
  }

  return <>{children}</>;
};

root.render(
  <React.StrictMode>
    <FontLoader>
      <App />
    </FontLoader>
  </React.StrictMode>
);