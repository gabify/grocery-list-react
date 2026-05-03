const GroceryItem = ({ item, onDelete, onToggle }) => {
    return (
        <li className={`
            flex items-center justify-between bg-gray-50 shadow-xs px-3 py-3 rounded-lg
            transition-transform duration-200 ease-out active:scale-105
            ${item.isBought ? 'opacity-75 bg-gray-100' : 'opacity-100'}
            `}
            onClick={onToggle}
        >
            <div className="flex items-center gap-2">
                <input type="checkbox" checked={item.isBought} readOnly />
                <div>
                    <p className={`font-semibold ${item.isBought ? 'line-through text-gray-400' : 'text-gray-900'}`}>{item.name} x{item.quantity}</p>
                </div>
            </div>

            <button className="text-red-400 text-sm" onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id)
            }}>
                Delete
            </button>
        </li>
    )
}

export default GroceryItem;