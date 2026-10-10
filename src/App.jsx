import { AppProvider } from './app/AppContext.jsx';
import { RouterProvider, useRouter, matchRoute, Link } from './app/router.jsx';
import AppLayout from './components/layout/AppLayout.jsx';
import LandingPage from './pages/LandingPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import CurriculumPage from './pages/CurriculumPage.jsx';
import ModulePage from './pages/ModulePage.jsx';
import LessonPage from './pages/LessonPage.jsx';
import VisualizerPage from './pages/VisualizerPage.jsx';
import ProblemsListPage from './pages/ProblemsListPage.jsx';
import CodingPracticePage from './pages/CodingPracticePage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import RevisionPage from './pages/RevisionPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

function RouteRenderer() {
  const { path } = useRouter();

  if (matchRoute('/', path).matched) return <LandingPage />;
  if (matchRoute('/dashboard', path).matched) return <DashboardPage />;
  if (matchRoute('/curriculum', path).matched) return <CurriculumPage />;

  const modMatch = matchRoute('/modules/:levelId', path);
  if (modMatch.matched) return <ModulePage levelId={modMatch.params.levelId} />;

  const lessonMatch = matchRoute('/lessons/:lessonId', path);
  if (lessonMatch.matched) return <LessonPage lessonId={lessonMatch.params.lessonId} />;

  if (matchRoute('/visualizer', path).matched) return <VisualizerPage />;
  if (matchRoute('/problems', path).matched) return <ProblemsListPage />;

  const probMatch = matchRoute('/problems/:problemId', path);
  if (probMatch.matched) return <CodingPracticePage problemId={probMatch.params.problemId} />;

  if (matchRoute('/analytics', path).matched) return <AnalyticsPage />;
  if (matchRoute('/revision', path).matched) return <RevisionPage />;
  if (matchRoute('/settings', path).matched) return <SettingsPage />;

  return (
    <div className="page-container">
      <div className="empty-state-box">
        <h2>Page Not Found</h2>
        <p>The requested route ({path}) does not exist.</p>
        <div style={{ marginTop: '1rem' }}>
          <Link to="/dashboard" className="btn btn-primary">
            Return to Learning Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <RouterProvider>
        <AppLayout>
          <RouteRenderer />
        </AppLayout>
      </RouterProvider>
    </AppProvider>
  );
}
