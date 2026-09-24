import { useEffect, useState } from 'react'
import { fetchCollection, displayName, recordId } from '../api.js'
import { EmptyMessage, ErrorMessage, SectionHeading } from './Activities.jsx'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((requestError) => setError(requestError.message)) }, [])

  return <section className="content-section">
    <SectionHeading eyebrow="Find your crew" title="Teams" count={teams.length} />
    {error ? <ErrorMessage message={error} /> : <div className="team-grid">{teams.map((team) => <article className="team-card" key={recordId(team)}>
      <div className="team-card-top"><span className="team-badge">✦</span><span>{team.members?.length || 0} members</span></div>
      <h2>{team.name}</h2><p>{team.description || 'A team ready to move together.'}</p>
      <div className="member-list">{(team.members || []).map((member) => <span key={recordId(member)} title={displayName(member)}>{displayName(member).charAt(0)}</span>)}</div>
    </article>)}{!teams.length && <EmptyMessage text="No teams have been created yet." />}</div>}
  </section>
}

export default Teams