import GroceryItem from "./GroceryItem";

const GroceryList = ({ items, sortBy, filter, onDeleteItem, onToggleBought}) => {
    const filteredItems = 
        filter === "all"
            ? items
            : items.filter(item => item.category.toLowerCase() === filter.toLowerCase());
        
    const sortedItems = [...filteredItems].sort((a, b) =>{
        switch(sortBy){
            case "alphabetical":
                return a.name.localeCompare(b.name);
            case "reverse-alphabetical":
                return b.name.localeCompare(a.name);
            case "reverse-alphabetical":
                return a.quantity - b.quantity;
            case "category":
                return a.category.localeCompare(b.category);
            case "unbought-first":
                return a.isBought - b.isBought;
            case "bought-first":
                return b.isBought - a.isBought;
            default:
                return 0;
        }
    })

    return (
        sortedItems.length > 0 ? (
            <ul className="mt-4 space-y-2">
                {sortedItems.map((item) => (
                    <GroceryItem key={item.id} item={item} onDelete={() => onDeleteItem(item.id)} onToggle={() => onToggleBought(item.id)} />
                ))}
            </ul>
        ) : (
            <p className="text-center text-gray-400 mt-5">Your grocery list is empty. Start adding items!</p>
        )
    )
}

export default GroceryList;