type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
};

export default function SearchBar({ search, onSearchChange, filter, onFilterChange }: Props) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Search by title or author..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
        <option value="All">All Status</option>
        <option value="Available">Available</option>
        <option value="Borrowed">Borrowed</option>
        <option value="Overdue">Overdue</option>
      </select>
    </div>
  );
}