import { useState } from "react";

const AddItemForm = ({ onAddItem }) => {
    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(1);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (itemName.trim()) {
            const newItem = {
                id: Date.now(),
                name: itemName.trim(),
                category: category.trim() || "Uncategorized",
                quantity: parseInt(quantity) || 1,
                isBought: false,
            };
            onAddItem(newItem);
            setItemName("");
            setCategory("");
            setQuantity(1);
        }
    }
    
    return (
        <form className="mt-3 mb-5" onSubmit={handleSubmit}>
            <div className="mb-2">
                <label className="text-sm">Item Name</label>
                <input
                    type="text"
                    className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 mt-1"
                    placeholder="e.g. Eggs"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label className="text-sm">Quantity</label>
                <input
                    type="number"
                    className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 mt-1"
                    placeholder="e.g. 12"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <div className="mb-0.5">
                <label className="text-sm">Category</label>
                <select className="w-full rounded-lg border-2 border-gray-300 px-2 py-1" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="all">All</option>
                    <option value="produce">Produce</option>
                    <option value="dairy">Dairy</option>
                    <option value="meat">Meat</option>
                    <option value="snacks">Snacks</option>
                </select>
            </div>

            <button className="w-full bg-gray-800 text-white py-2 rounded-lg mt-2">
                Add Item
            </button>
        </form>
    )
}

export default AddItemForm;