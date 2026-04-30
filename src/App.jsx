import { useState, useEffect } from "react";

import AddItemForm from "./components/AddItemForm";
import GroceryList from "./components/GroceryList";
import Header from "./components/Header";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item])
    localStorage.setItem("groceryList", JSON.stringify([...items, item]));
  };

  const deleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    localStorage.setItem("groceryList", JSON.stringify(newItems));
  }

  const toggleBought = (index) =>{
    const newItems = [...items];
    newItems[index].isBought = !newItems[index].isBought;
    setItems(newItems);
    localStorage.setItem("groceryList", JSON.stringify(newItems));
  }

  useEffect(() => {
    const groceryList = localStorage.getItem("groceryList");
    if (groceryList) {
      setItems(JSON.parse(groceryList));
    }
  }, [])


  return (
    <>
      <main className="px-4 py-8">
        <Header title="Listahan" subtitle="A simple grocery list app"/>

        <AddItemForm onAddItem={addItem} />

        <GroceryList items={items} onDeleteItem={deleteItem} onToggleBought={toggleBought} />
      </main>
    </>
  )
}

export default App
