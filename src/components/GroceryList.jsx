import GroceryItem from "./GroceryItem";

const GroceryList = ({ items, filter, onDeleteItem, onToggleBought}) => {
    const filteredItems = 
        filter === "all"
            ? items
            : items.filter(item => item.category.toLowerCase() === filter.toLowerCase());

    return (
        filteredItems.length > 0 ? (
            <ul className="mt-4 space-y-2">
                {filteredItems.map((item) => (
                    <GroceryItem key={item.id} item={item} onDelete={() => onDeleteItem(item.id)} onToggle={() => onToggleBought(item.id)} />
                ))}
            </ul>
        ) : (
            <p className="text-center text-gray-400 mt-5">Your grocery list is empty. Start adding items!</p>
        )
    )
}

export default GroceryList;