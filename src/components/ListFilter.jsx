const ListFilter = ({ filter, onSelect }) => {
    return (
        <select className="w-full rounded-lg border-2 border-gray-300 px-2 py-1 mb-2" value={filter} onChange={(e) => onSelect(e.target.value)}>
            <option>Filter By</option>
            <option value="all">All</option>
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="meat">Meat</option>
            <option value="snacks">Snacks</option>
        </select>
    )
}

export default ListFilter;