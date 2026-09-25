import { NavLink, Route, Routes } from 'react-router-dom';

import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { getApiBaseUrl } from './utils/api.js';

const navItems = [
  { label: 'Users', to: '/users' },
  { label: 'Teams', to: '/teams' },
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Workouts', to: '/workouts' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const apiBaseUrl = getApiBaseUrl();

  return (
    <div className="container py-4">
      <header className="mb-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <p className="text-uppercase text-muted mb-1">Octofit Tracker</p>
            <h1 className="mb-0">Multi-tier fitness dashboard</h1>
          </div>
          <div className="text-end">
            <div className="small text-muted">API base URL</div>
            <strong>{apiBaseUrl}</strong>
          </div>
        </div>
      </header>

      <div className="alert alert-info">
        Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to target a Codespaces URL.
        When it is unset, the app falls back to <code>http://localhost:8000</code>.
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded mb-4 px-3">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Octofit</span>
          <div className="navbar-nav flex-row gap-3 flex-wrap">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active text-white' : 'text-light'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Users />} />
          </Routes>
        </div>
      </div>

      {!codespaceName && (
        <div className="mt-3 text-muted small">
          CodeSpaces name not set: using localhost fallback and avoiding undefined public URLs.
        </div>
      )}
    </div>
  );
}

export default App;
