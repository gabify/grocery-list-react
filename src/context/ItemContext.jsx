import { createContext, useReducer, useEffect } from "react";

export const ItemContext = createContext();

const itemReducer = (state, action) =>{
    switch(action.type){
        case "SET_ITEMS":
            return {
                items: action.payload
            }
        case "ADD_ITEM":
            return {
                items: [...state.items, action.payload]
            }
        case "DELETE_ITEM":
            return {
                items: state.items.filter(item => item.id !== action.payload)
            }
        case "EDIT_ITEM":
            return {
                items: state.items.map(
                    item => item.id === action.payload.id ? action.payload : item
                )
            }
        case "TOGGLE_ITEM":
            return {
                items: state.items.map(
                    item => item.id === action.payload ? 
                        {...item, isBought: !item.isBought} 
                        : item
                )
            }

        default: return state;
    }
}

const initializer = () => {
    try {
        const groceryList = localStorage.getItem("groceryList");

        return {
            items: groceryList
                ? JSON.parse(groceryList)
                : []
        };
    } catch {
        return {
            items: []
        };
    }
};

export const ItemContextProvider = ({ children }) => {
    let isDataLoaded = false;
    const [state, dispatch] = useReducer(itemReducer, undefined, initializer);

    useEffect(() =>{
        localStorage.setItem("groceryList", JSON.stringify(state.items));
    }, [state.items]);

    return (
        <ItemContext value={{...state, dispatch}}>
            { children}
        </ItemContext>
    )
}