import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
        Welcome
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Features coming soon
      </p>

      {/* Agents replace this placeholder with real feature content */}
    </div>
  )
}
