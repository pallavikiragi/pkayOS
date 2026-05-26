export function JourneyPage() {
  const milestones = [
    { year: '2024', event: 'Senior Designer @ Enterprise Co.', details: 'Leading interaction systems.' },
    { year: '2022', event: 'UX Researcher @ Innovation Lab', details: 'Spatial computing studies.' },
    { year: '2020', event: 'Junior Designer @ Studio Alpha', details: 'Brand systems and UI.' },
  ];

  return (
    <div className="journey-page">
      <div className="roadmap">
        {milestones.map((m, i) => (
          <div key={m.year} className="roadmap-item">
            <div className="roadmap-marker">
              <div className="roadmap-year">{m.year}</div>
              <div className="roadmap-line" />
            </div>
            <div className="roadmap-content">
              <h4>{m.event.toUpperCase()}</h4>
              <p>{m.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
