export default function Header({ isDark, onToggleTheme }) {
  return (
    <div className="top-bar">
      <h1>Smart City Weather</h1>
      <button className="theme-toggle" onClick={onToggleTheme} title={isDark ? "Switch to Light" : "Switch to Dark"}>
        {isDark ? "🌞" : "🌙"}
      </button>
    </div>
  );
}

