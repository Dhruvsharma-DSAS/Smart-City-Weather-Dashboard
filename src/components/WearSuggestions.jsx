export default function WearSuggestions({ tips }) {
  return (
    <div className="wear-section">
      <h3>What to Wear</h3>
      <div className="wear-cards">
        {tips.map((tip) => (
          <div className="wear-card" key={tip}>
            {tip}
          </div>
        ))}
      </div>
    </div>
  );
}
