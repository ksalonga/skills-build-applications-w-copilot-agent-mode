import { useEffect, useState } from 'react';

const workoutsApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    fetch(workoutsApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        const nextWorkouts = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : [];

        if (!ignore) {
          setWorkouts(nextWorkouts);
        }
      })
      .catch((fetchError) => {
        if (!ignore) {
          setError(fetchError.message || 'Unable to load workouts.');
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
    return <div className="alert alert-secondary">Loading workouts...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section>
      <h2>Workouts</h2>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div key={workout.id ?? workout.title} className="col-md-6">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="card-text mb-1">Focus: {workout.focus}</p>
                <p className="card-text mb-1">Duration: {workout.durationMinutes} min</p>
                <p className="card-text mb-1">Difficulty: {workout.difficulty}</p>
                <p className="card-text mb-0">
                  Equipment: {Array.isArray(workout.equipment) ? workout.equipment.join(', ') : 'None'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
