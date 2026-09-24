import { useEffect, useState } from 'react'
import { fetchCollection, displayName, recordId } from '../api.js'
import { EmptyMessage, ErrorMessage, SectionHeading } from './Activities.jsx'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('users').then(setUsers).catch((requestError) => setError(requestError.message)) }, [])

  return <section className="content-section">
    <SectionHeading eyebrow="The community" title="People" count={users.length} />
    {error ? <ErrorMessage message={error} /> : <div className="people-grid">{users.map((user) => <article className="person-card" key={recordId(user)}>
      <span className="person-avatar">{displayName(user).charAt(0)}</span><div><h2>{displayName(user)}</h2><p>@{user.username}</p></div><span className="level-tag">{user.fitnessLevel}</span>
    </article>)}{!users.length && <EmptyMessage text="No athletes have joined yet." />}</div>}
  </section>
}

export default Users