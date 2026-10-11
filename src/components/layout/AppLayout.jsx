import { useState } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import AdBanner from './AdBanner.jsx';

export default function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app-shell">
      <Header
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />

      <div className="app-body">
        <Sidebar
          isOpen={isSidebarOpen}
          onCloseMobile={() => {
            if (window.innerWidth < 960) {
              setIsSidebarOpen(false);
            }
          }}
        />

        <main className="app-main-content">
          {children}

          {/* Bottom Google AdSense Unit & Footer */}
          <footer className="app-bottom-footer">
            <AdBanner />
            <div className="app-footer-meta">
              <span>
                © {new Date().getFullYear()} <strong>MyDSA</strong> — Interactive Data
                Structures & Algorithms Learning Platform.
              </span>
              <span className="footer-privacy-note">
                Privacy & Cookies: We use browser localStorage to save your learning progress
                and Google AdSense cookies to serve relevant advertisements.
              </span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
