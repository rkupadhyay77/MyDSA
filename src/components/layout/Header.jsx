import { Link, useRouter } from '../../app/router.jsx';
import { useApp } from '../../app/AppContext.jsx';
import { SUPPORTED_LANGUAGES } from '../../curriculum/curriculumData.js';

export default function Header({ onToggleSidebar, isSidebarOpen }) {
  const { path } = useRouter();
  const {
    userState,
    setPreferredLanguage,
    toggleTheme,
    toggleBeginnerMode,
  } = useApp();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/curriculum', label: 'Curriculum (L1–L14)' },
    { to: '/visualizer', label: 'Visualizers' },
    { to: '/problems', label: 'Practice (11)' },
    { to: '/analytics', label: 'Analytics' },
    { to: '/revision', label: 'Revision & Mock' },
    { to: '/settings', label: 'Settings' },
  ];

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="sidebar-toggle-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle curriculum sidebar"
          title={isSidebarOpen ? 'Hide Curriculum Sidebar' : 'Show Curriculum Sidebar'}
        >
          ☰
        </button>

        <Link to="/" className="brand-logo">
          <span className="brand-icon">◈</span>
          <span className="brand-text">
            My<strong>DSA</strong>
          </span>
          <span className="brand-tag">Interactive Prep</span>
        </Link>
      </div>

      <nav className="header-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive =
            path === item.to ||
            (item.to !== '/' && path.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`header-nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="header-right">
        {/* Global Preferred Language Selector */}
        <div className="header-lang-picker" title="Preferred language for lessons & code editor">
          <label htmlFor="global-lang-select" className="sr-only">
            Preferred Programming Language
          </label>
          <select
            id="global-lang-select"
            value={userState.preferredLanguage}
            onChange={(e) => setPreferredLanguage(e.target.value)}
            className="header-select"
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>

        {/* Explain Like I'm a Beginner Toggle */}
        <button
          type="button"
          className={`header-pill-btn ${userState.beginnerMode ? 'active' : ''}`}
          onClick={toggleBeginnerMode}
          title="Toggle 'Explain Like I'm a Beginner' callouts in lessons & visualizers"
        >
          {userState.beginnerMode ? '💡 Beginner Mode: ON' : '💡 Beginner Mode: OFF'}
        </button>

        {/* Streak Indicator */}
        <span className="streak-pill" title="Current learning streak">
          🔥 {userState.streakDays}d
        </span>

        {/* Theme Toggle */}
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${userState.theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle dark or light theme"
        >
          {userState.theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
}
