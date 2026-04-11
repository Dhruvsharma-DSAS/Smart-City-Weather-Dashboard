export default function SearchBar({ val, onChange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search for a city..."
        value={val}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}




