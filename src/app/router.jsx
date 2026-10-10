/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext(null);

const KNOWN_ROUTE_PREFIXES = [
  '/dashboard',
  '/curriculum',
  '/modules',
  '/lessons',
  '/visualizer',
  '/problems',
  '/analytics',
  '/revision',
  '/settings',
];

/**
 * Resolves the current route from either:
 * 1. URL hash (e.g., #/dashboard -> /dashboard) — works on GitHub Pages, /dist/index.html, and static hosts
 * 2. URL pathname if it matches a known app route (e.g., http://localhost:5173/dashboard)
 * 3. Defaults to '/' so sub-paths like /MyDSA/ or /dist/index.html render the Landing Page instead of 404.
 */
function resolveCurrentRoute() {
  const hash = window.location.hash;
  if (hash && hash.startsWith('#/')) {
    return hash.slice(1) || '/';
  }

  const pathname = window.location.pathname || '/';
  for (const prefix of KNOWN_ROUTE_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return pathname;
    }
  }

  return '/';
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => resolveCurrentRoute());

  useEffect(() => {
    const syncRoute = () => {
      setPath(resolveCurrentRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  const navigate = useCallback((to) => {
    if (!to) return;
    const normalized = to.startsWith('/') ? to : `/${to}`;
    window.location.hash = normalized;
    setPath(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return ctx;
}

export function Link({ to, className = '', children, onClick, title, style }) {
  const { navigate } = useRouter();
  const normalized = to && to.startsWith('/') ? to : `/${to || ''}`;

  const handleClick = (e) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey
    ) {
      return;
    }
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(normalized);
  };

  return (
    <a
      href={`#${normalized}`}
      className={className}
      onClick={handleClick}
      title={title}
      style={style}
    >
      {children}
    </a>
  );
}

/**
 * Matches patterns like '/lessons/:id' against current path
 */
export function matchRoute(pattern, currentPath) {
  const cleanPattern = pattern.split('?')[0].replace(/\/+$/, '') || '/';
  const cleanPath = currentPath.split('?')[0].replace(/\/+$/, '') || '/';

  if (cleanPattern === cleanPath) {
    return { matched: true, params: {} };
  }

  const patternParts = cleanPattern.split('/').filter(Boolean);
  const pathParts = cleanPath.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) {
    return { matched: false, params: {} };
  }

  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];
    const c = pathParts[i];
    if (p.startsWith(':')) {
      params[p.slice(1)] = decodeURIComponent(c);
    } else if (p !== c) {
      return { matched: false, params: {} };
    }
  }

  return { matched: true, params };
}
