import { useState } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

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

        <main className="app-main-content">{children}</main>
      </div>
    </div>
  );
}
