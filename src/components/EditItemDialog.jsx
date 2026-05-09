import { useState } from "react";
import Header from "./Header";
import { useItemContext } from "../hooks/useItemContext";
import toast from "react-hot-toast";

const EditItemDialog = ({ item, isOpen, dialogRef, onClose }) => {
    const {dispatch} = useItemContext();
    const [itemName, setItemName] = useState(item.name);
    const [category, setCategory] = useState(item.category);
    const [quantity, setQuantity] = useState(item.quantity);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (itemName.trim()) {
            const newItem = {
                id: item.id,
                name: itemName.trim(),
                category: category.trim() || "Uncategorized",
                quantity: parseInt(quantity) || 1,
                isBought: item.isBought,
            };
            dispatch({type: "EDIT_ITEM", payload: newItem});
            toast.success(`${itemName} updated!`);
            onClose();
        }else{
            toast.error("Please enter a valid item name.");
        }
    }
    
    return (
        <dialog className={
            `rounded-lg m-4 px-4 py-5 w-full relative transition-all duration-150 ease-out transform
            ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
            `} 
            ref={dialogRef}
        >
            <button className="absolute top-2 right-2 text-lg text-red-500 hover:text-gray-700" onClick={onClose}>
                &times;
            </button>
            <Header title="Edit Item" subtitle="Fill out the details below to edit the item." />
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
                        onChange={(e) => {
                            if(e.target.value < 1){
                                setQuantity(1);
                            }else{
                                setQuantity(e.target.value)
                            }
                        }}
                    />
                </div>
                <div className="mb-0.5">
                    <label className="text-sm">Category</label>
                    <select className="w-full rounded-lg border-2 border-gray-300 px-2 py-1" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select a category</option>
                        <option value="produce">Produce</option>
                        <option value="dairy">Dairy</option>
                        <option value="meat">Meat</option>
                        <option value="snacks">Snacks</option>
                    </select>
                </div>

                <button className="w-full bg-gray-800 text-white py-2 rounded-lg mt-2">
                    Submit
                </button>
            </form>
        </dialog>
    )
}

export default EditItemDialog;