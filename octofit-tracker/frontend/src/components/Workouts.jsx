import { useEffect, useState } from 'react'
import { fetchCollection, recordId } from '../api.js'
import { EmptyMessage, ErrorMessage, SectionHeading } from './Activities.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((requestError) => setError(requestError.message)) }, [])

  return <section className="content-section">
    <SectionHeading eyebrow="Personalized guidance" title="Workouts" count={workouts.length} />
    {error ? <ErrorMessage message={error} /> : <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={recordId(workout)}>
      <div className="workout-meta"><span>{workout.fitnessLevel}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><ul>{(workout.exercises || []).map((exercise) => <li key={exercise}>{exercise}</li>)}</ul>
    </article>)}{!workouts.length && <EmptyMessage text="No workouts are available yet." />}</div>}
  </section>
}

export default Workouts