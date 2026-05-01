const GroceryItem = ({ item, onDelete, onToggle }) => {
    return (
        <li className="flex items-center justify-between bg-gray-50 shadow-xs px-3 py-3 rounded-lg">
            <div className="flex items-center gap-2">
                <input type="checkbox" checked={item.isBought} onChange={onToggle} />
                <div>
                    <p className={`text-gray-800 ${item.isBought ? 'line-through' : ''}`}>{item.name}</p>
                    <p className="text-xs text-gray-500">({item.category})</p>
                </div>
            </div>

            <button className="text-red-400 text-sm" onClick={onDelete}>
                Delete
            </button>
        </li>
    )
}

export default GroceryItem;