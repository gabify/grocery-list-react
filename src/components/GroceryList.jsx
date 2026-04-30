import GroceryItem from "./GroceryItem";

const GroceryList = ({ items, onDeleteItem, onToggleBought}) => {
    return (
        items.length > 0 ? (
            <ul className="mt-4 space-y-2">
                {items.map((item, index) => (
                    <GroceryItem key={index} item={item} onDelete={() => onDeleteItem(index)} onToggle={() => onToggleBought(index)} />
                ))}
            </ul>
        ) : (
            <p className="text-center text-gray-400 mt-5">Your grocery list is empty. Start adding items!</p>
        )
    )
}

export default GroceryList;