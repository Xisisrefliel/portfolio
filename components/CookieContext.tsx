import * as React from 'react';

type ConsentType = {
  analytics: boolean;
};

interface CookieContextType {
  consent: ConsentType;
  hasConsented: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
}

const CookieContext = React.createContext<CookieContextType | undefined>(undefined);

export const useCookieConsent = () => {
  const context = React.useContext(CookieContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
};

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = React.useState<ConsentType>({ analytics: false });
  const [hasConsented, setHasConsented] = React.useState(false);

  React.useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      const parsed = JSON.parse(savedConsent);
      setConsent(parsed);
      setHasConsented(true);
    }
  }, []);

  const acceptAll = () => {
    const newConsent = { analytics: true };
    setConsent(newConsent);
    setHasConsented(true);
    localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
  };

  const rejectAll = () => {
    const newConsent = { analytics: false };
    setConsent(newConsent);
    setHasConsented(true);
    localStorage.setItem('cookieConsent', JSON.stringify(newConsent));
  };

  return (
    <CookieContext.Provider value={{ consent, hasConsented, acceptAll, rejectAll }}>
      {children}
    </CookieContext.Provider>
  );
};
