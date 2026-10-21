import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import Home from './app/page';

const initApp = () => {
  const container = document.getElementById('msbte-app-root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <AppProvider>
          <Home />
        </AppProvider>
      </React.StrictMode>
    );
  }
};

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}
