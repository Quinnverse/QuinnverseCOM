import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
});

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>(() => {
    // Legacy Hash Compatibility Layer
    const hash = window.location.hash.toLowerCase();
    const hashMigrationMap: Record<string, string> = {
      '#products': '/products',
      '#library': '/resources',
      '#notes': '/journal',
      '#about': '/about',
      '#contact': '/work-with-us',
      '#hobbies': '/about',
      '#find-and-picks': '/picks',
      '#lab': '/lab',
      '#essays-and-projects': '/journal',
      '#behind': '/about',
    };

    if (hash && hashMigrationMap[hash]) {
      const target = hashMigrationMap[hash];
      window.history.replaceState(null, '', target);
      return target;
    }

    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string, options?: { replace?: boolean }) => {
    // If it's an external url, let it open normally
    if (to.startsWith('http://') || to.startsWith('https://')) {
      window.open(to, '_blank', 'noopener,noreferrer');
      return;
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (options?.replace) {
      window.history.replaceState(null, '', to);
    } else {
      window.history.pushState(null, '', to);
    }
    setPath(to);
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
}

export const Link: React.FC<LinkProps> = ({ to, replace, children, onClick, ...props }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If command or control key is pressed, allow standard new-tab behavior
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    
    if (!to.startsWith('http://') && !to.startsWith('https://')) {
      e.preventDefault();
      navigate(to, { replace });
      if (onClick) onClick(e);
    }
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
