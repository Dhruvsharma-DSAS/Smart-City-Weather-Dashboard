export default function SearchBar({ cityInput, onCityInputChange, onSearch }) {
  function onSubmit(event) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form className="search-box" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter city name..."
        value={cityInput}
        onChange={(event) => onCityInputChange(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
