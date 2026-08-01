export default function Loading() {
  return (
    <div style={{ paddingTop: 96 }}>
      {/* Hero skeleton */}
      <div className="container" style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div className="skeleton" style={{ width: 120, height: 12, marginBottom: 20 }} />
        <div className="skeleton" style={{ width: '60%', height: 64 }} />
      </div>
      <div className="skeleton" style={{ width: '100%', aspectRatio: '21/9' }} />

      {/* Overview skeleton */}
      <div className="container" style={{ paddingTop: 96 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 40, borderRadius: 2 }} />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="skeleton" style={{ height: 20, width: '80%' }} />
            <div className="skeleton" style={{ height: 16, width: '100%' }} />
            <div className="skeleton" style={{ height: 16, width: '90%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
