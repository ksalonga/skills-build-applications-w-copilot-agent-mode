import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const activitiesApiUrl = `${apiBaseUrl}/api/activities/`;

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetch(activitiesApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        const nextActivities = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : [];

        if (!ignore) {
          setActivities(nextActivities);
        }
      })
      .catch((fetchError) => {
        if (!ignore) {
          setError(fetchError.message || 'Unable to load activities.');
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
    return <div className="alert alert-secondary">Loading activities...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <h2>Activities</h2>
      <div className="row g-3">
        {activities.map((item) => (
          <div key={item.id ?? `${item.userId}-${item.date}`} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-capitalize">{item.type}</h5>
                <p className="card-text mb-1">User ID: {item.userId}</p>
                <p className="card-text mb-1">Duration: {item.durationMinutes} min</p>
                <p className="card-text mb-1">Calories: {item.caloriesBurned}</p>
                <p className="card-text mb-0">Date: {item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
