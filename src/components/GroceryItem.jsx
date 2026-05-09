import { useState, useRef } from "react";
import EditItemDialog from "./EditItemDialog";
import { useItemContext } from "../hooks/useItemContext";
import toast from "react-hot-toast";

const GroceryItem = ({ item }) => {
    const {dispatch} = useItemContext();
    const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false);
    const dialogRef = useRef(null);
    const openDialog = () => {
        dialogRef.current.showModal();
        setIsEditItemDialogOpen(true);
    }

    const closeDialog = () => {
        dialogRef.current.close();
        setIsEditItemDialogOpen(false);
    }

    return (
        <li className={`
            flex items-center justify-between bg-gray-50 shadow-xs px-3 py-3 rounded-lg
            transition-transform duration-200 ease-out active:scale-105
            ${item.isBought ? 'opacity-75 bg-gray-100' : 'opacity-100'}
            `}
            onClick={() => dispatch({type: "TOGGLE_ITEM", payload: item.id})}
        >
            <div className="flex items-center gap-2">
                <input type="checkbox" checked={item.isBought} readOnly />
                <div>
                    <p className={`font-semibold ${item.isBought ? 'line-through text-gray-400' : 'text-gray-900'}`}>{item.name} x{item.quantity}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button className="text-amber-400 text-sm" onClick={(e) => {
                    e.stopPropagation();
                    openDialog();
                }}>
                    Edit
                </button>
                <button className="text-red-400 text-sm" onClick={(e) => {
                    e.stopPropagation();
                    dispatch({type: "DELETE_ITEM", payload: item.id});
                    toast.success(`${item.name} deleted!`);
                }}>
                    Delete
                </button>
            </div>

            <EditItemDialog item={item} isOpen={isEditItemDialogOpen} dialogRef={dialogRef} onClose={closeDialog} />
        </li>
    )
}

export default GroceryItem;