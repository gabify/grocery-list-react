import { useState } from "react";

const AddItemForm = ({ onAddItem }) => {
    const [itemName, setItemName] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (itemName.trim()) {
            const newItem = {
                name: itemName.trim(),
                isBought: false,
            };
            onAddItem(newItem);
            setItemName("");
        }
    }
    
    return (
        <form className="mt-3 mb-5" onSubmit={handleSubmit}>
            <div className="0.5">
                <label className="text-sm">Item Name</label>
                <input
                    type="text"
                    className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 mt-1"
                    placeholder="e.g. Eggs"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />
            </div>

            <button className="w-full bg-gray-800 text-white py-2 rounded-lg mt-2">
                Add Item
            </button>
        </form>
    )
}

export default AddItemForm;