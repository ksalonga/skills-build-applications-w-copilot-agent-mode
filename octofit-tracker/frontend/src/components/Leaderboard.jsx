import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const leaderboardApiUrl = `${apiBaseUrl}/api/leaderboard/`;

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetch(leaderboardApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        const nextEntries = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : [];

        if (!ignore) {
          setEntries(nextEntries);
        }
      })
      .catch((fetchError) => {
        if (!ignore) {
          setError(fetchError.message || 'Unable to load leaderboard.');
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-secondary">Loading leaderboard...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <h2>Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Score</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={entry.id ?? entry.userId ?? index}>
                <td>{index + 1}</td>
                <td>{entry.userName}</td>
                <td>{entry.score}</td>
                <td>{entry.streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
