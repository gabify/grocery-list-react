const ListSorter = ({onSelect }) => {
    return (
        <select className="w-full rounded-lg border-2 border-gray-300 px-2 py-1" onChange={(e) => onSelect(e.target.value)}>
            <option>Sort By</option>
            <option value="default">Default</option>
            <option value="alphabetical">A-Z</option>
            <option value="reverse-alphabetical">Z-A</option>
            <option value="quantity">Quantity</option>
            <option value="category">Category</option>
            <option value="unbought-first">Unbought First</option>
            <option value="bought-first">Bought First</option>
        </select>
    )
}

export default ListSorter;