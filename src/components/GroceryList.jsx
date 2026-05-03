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

    const groupedItems = sortedItems.reduce((groups, items) =>{
        if(!groups[items.category]){
            groups[items.category] = [];
        }

        groups[items.category].push(items);
        return groups;
    }, {});

    

    return (
        Object.keys(groupedItems).length > 0 ? (
            Object.entries(groupedItems).map(([category, items]) => (
                <section key={category} className="mb-6">
                    <h2 className="text-sm font-semibold uppercase text-gray-400 mt-6 mb-2">{category}</h2>
                    <ul className="space-y-2">
                        {items.map((item) => (
                            <GroceryItem key={item.id} item={item} onDelete={onDeleteItem} onToggle={() => onToggleBought(item.id)} />
                        ))}
                    </ul>
                </section>
            ))
        ) : (
            <p className="text-center text-gray-400 mt-5">Your grocery list is empty. Start adding items!</p>
        )
    )
}

export default GroceryList;