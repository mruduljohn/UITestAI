import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { ScenarioPage } from './pages/ScenarioPage';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reports" element={<ScenarioPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
