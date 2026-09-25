import { useEffect, useState } from 'react';

import { buildApiUrl, normalizeDataResponse } from '../utils/api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetch(buildApiUrl('teams'))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        if (!ignore) {
          setTeams(normalizeDataResponse(payload));
        }
      })
      .catch((fetchError) => {
        if (!ignore) {
          setError(fetchError.message || 'Unable to load teams.');
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
    return <div className="alert alert-secondary">Loading teams...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <h2>Teams</h2>
      <div className="row g-3">
        {teams.map((team) => (
          <div key={team.id ?? team.name} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description}</p>
                <p className="card-text mb-0">
                  Members: {Array.isArray(team.members) ? team.members.join(', ') : 'None'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
