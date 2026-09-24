import { useEffect, useState } from 'react'
import { fetchCollection, displayName, recordId } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <section className="content-section">
      <SectionHeading eyebrow="The movement log" title="Activities" count={activities.length} />
      {error ? <ErrorMessage message={error} /> : (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Athlete</th><th>Activity</th><th>Duration</th><th>Distance</th><th>Points</th></tr></thead>
            <tbody>{activities.map((activity) => (
              <tr key={recordId(activity)}>
                <td className="primary-cell">{displayName(activity.user)}</td>
                <td><span className="type-tag">{activity.type}</span></td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.distanceKm ? `${activity.distanceKm} km` : '—'}</td>
                <td className="points-cell">+{activity.points}</td>
              </tr>
            ))}</tbody>
          </table>
          {!activities.length && <EmptyMessage text="No activities logged yet." />}
        </div>
      )}
    </section>
  )
}

export function SectionHeading({ eyebrow, title, count }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div>{count !== undefined && <span className="result-count">{count} records</span>}</div>
}

export function ErrorMessage({ message }) { return <div className="message error-message">Unable to load this view. {message}</div> }
export function EmptyMessage({ text }) { return <div className="message">{text}</div> }

export default Activities