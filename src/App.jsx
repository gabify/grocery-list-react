import { useState, useEffect } from "react";

import AddItemForm from "./components/AddItemForm";
import GroceryList from "./components/GroceryList";
import Header from "./components/Header";
import ListFilter from "./components/ListFilter";

function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  const addItem = (item) => setItems([...items, item]);

  const deleteItem = (id) => setItems(items.filter(item => item.id !== id));

  const toggleBought = (id) =>{
    const newItems = items.map(item => 
      item.id === id ? {...item, isBought: !item.isBought} : item
    );
    setItems(newItems);
  }

  const changeFilter = (newFilter) => setFilter(newFilter);

  useEffect(() => {
    const groceryList = localStorage.getItem("groceryList");
    if (groceryList) {
      setItems(JSON.parse(groceryList));
    }
  }, []);

  useEffect(() =>{
    const updateGroceryList = () => localStorage.setItem("groceryList", JSON.stringify(items));
    updateGroceryList();
  }, [items]);

  return (
    <>
      <main className="px-4 py-8">
        <Header title="Listahan" subtitle="A simple grocery list app"/>

        <AddItemForm onAddItem={addItem} />

        <ListFilter onSelect={changeFilter}/>
        <GroceryList items={items} filter={filter} onDeleteItem={deleteItem} onToggleBought={toggleBought} />
      </main>
    </>
  )
}

export default App
