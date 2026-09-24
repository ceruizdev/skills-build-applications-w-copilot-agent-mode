import { useEffect, useState } from 'react'
import { fetchCollection, displayName, recordId } from '../api.js'
import { EmptyMessage, ErrorMessage, SectionHeading } from './Activities.jsx'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchCollection('leaderboard').then(setLeaders).catch((requestError) => setError(requestError.message)) }, [])

  return <section className="content-section leaderboard-section">
    <SectionHeading eyebrow="Friendly competition" title="Leaderboard" count={leaders.length} />
    {error ? <ErrorMessage message={error} /> : leaders.length ? <div className="leader-list">{leaders.map((entry, index) => (
      <article className={`leader-row rank-${index + 1}`} key={recordId(entry.user) || recordId(entry)}>
        <span className="rank">{String(index + 1).padStart(2, '0')}</span>
        <span className="leader-avatar">{displayName(entry.user).charAt(0)}</span>
        <div className="leader-name"><strong>{displayName(entry.user)}</strong><span>{entry.activities || 0} activities</span></div>
        <strong className="leader-points">{entry.points || 0}<small> pts</small></strong>
      </article>
    ))}</div> : <EmptyMessage text="No leaderboard entries yet." />}
  </section>
}

export default Leaderboard