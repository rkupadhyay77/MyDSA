import { useState } from 'react';
import { useApp } from '../app/AppContext.jsx';
import { SUPPORTED_LANGUAGES } from '../curriculum/curriculumData.js';
import { exportUserStateJson } from '../services/storageService.js';

export default function SettingsPage() {
  const {
    userState,
    setPreferredLanguage,
    setTheme,
    toggleBeginnerMode,
    handleResetProgress,
  } = useApp();

  const [confirmReset, setConfirmReset] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const handleCopyExport = async () => {
    try {
      await navigator.clipboard.writeText(exportUserStateJson(userState));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    } catch {
      setCopiedJson(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header-block">
        <div>
          <span className="eyebrow-label">Preferences & Data</span>
          <h1>Platform Settings & Storage</h1>
          <p>
            Configure your default programming language (used across all lessons and coding
            templates), visual theme, Beginner Mode, and prototype local storage.
          </p>
        </div>
      </div>

      <div className="settings-stack">
        {/* 1. Preferred Programming Language */}
        <div className="dashboard-panel">
          <h2>1. Preferred Programming Language</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            MyDSA teaches DSA concepts language-independently while adapting every lesson
            walkthrough and coding problem starter template to your chosen language.
          </p>

          <div className="lang-cards-grid">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = userState.preferredLanguage === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  className={`lang-option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setPreferredLanguage(lang.id)}
                >
                  <div className="lang-card-top">
                    <strong>{lang.name}</strong>
                    <span className="badge badge-track">{lang.badge}</span>
                  </div>
                  <span className="lang-version-text">{lang.version}</span>
                  {isSelected && (
                    <span className="lang-active-indicator">✓ Active Default</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Learning Experience & Appearance */}
        <div className="dashboard-panel">
          <h2>2. Learning Experience & Theme</h2>
          <div className="settings-row-item">
            <div>
              <h4>💡 &ldquo;Explain Like I&rsquo;m a Beginner&rdquo; Mode</h4>
              <p style={{ color: 'var(--text-secondary)' }}>
                Shows plain-English intuition boxes in lessons and extra step-by-step guidance
                inside algorithm visualisers.
              </p>
            </div>
            <button
              type="button"
              className={`btn ${userState.beginnerMode ? 'btn-primary' : 'btn-secondary'}`}
              onClick={toggleBeginnerMode}
            >
              {userState.beginnerMode ? 'Enabled (ON)' : 'Disabled (OFF)'}
            </button>
          </div>

          <div className="settings-row-item" style={{ marginTop: '1.25rem' }}>
            <div>
              <h4>🎨 Interface Theme</h4>
              <p style={{ color: 'var(--text-secondary)' }}>
                Switch between high-contrast Dark Mode (ideal for coding) and clean Light Mode
                (ideal for daytime reading).
              </p>
            </div>
            <div className="viz-btn-group">
              <button
                type="button"
                className={`btn btn-sm ${
                  userState.theme === 'dark' ? 'btn-primary' : 'btn-secondary'
                }`}
                onClick={() => setTheme('dark')}
              >
                🌙 Dark Theme
              </button>
              <button
                type="button"
                className={`btn btn-sm ${
                  userState.theme === 'light' ? 'btn-primary' : 'btn-secondary'
                }`}
                onClick={() => setTheme('light')}
              >
                ☀️ Light Theme
              </button>
            </div>
          </div>
        </div>

        {/* 3. Prototype Persistence vs Cloud Storage */}
        <div className="dashboard-panel">
          <h2>3. Progress Persistence (Phase 1 Local Prototype)</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Currently using <code>window.localStorage</code> (key:{' '}
            <code>mydsa_user_state_v1</code>). In Phase 4, this service layer connects to
            authenticated user accounts and a backend database for cross-device synchronisation.
          </p>

          <div className="settings-actions-row">
            <button type="button" className="btn btn-secondary" onClick={handleCopyExport}>
              {copiedJson ? '✓ Copied Progress JSON!' : '📋 Copy Progress JSON Backup'}
            </button>

            {!confirmReset ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setConfirmReset(true)}
              >
                🗑 Reset All Local Progress
              </button>
            ) : (
              <div className="confirm-reset-inline">
                <span>Are you sure?</span>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    handleResetProgress();
                    setConfirmReset(false);
                  }}
                >
                  Yes, Reset Everything
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setConfirmReset(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
