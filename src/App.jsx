import { useState, useEffect, useRef } from "react";

import AddItemDialog from "./components/AddItemDialog";
import GroceryList from "./components/GroceryList";
import Header from "./components/Header";
import ListFilter from "./components/ListFilter";
import ListSorter from "./components/ListSorter";

function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const dialogRef = useRef(null);
  const openDialog = () => dialogRef.current.showModal();
  const closeDialog = () => dialogRef.current.close();

  const addItem = (item) => {
    setItems([...items, item]);
    localStorage.setItem("groceryList", JSON.stringify([...items, item]));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    localStorage.setItem("groceryList", JSON.stringify(items.filter(item => item.id !== id)));
  }

  const toggleBought = (id) =>{
    const newItems = items.map(item => 
      item.id === id ? {...item, isBought: !item.isBought} : item
    );
    setItems(newItems);
    localStorage.setItem("groceryList", JSON.stringify(newItems));
  }

  const changeFilter = (newFilter) => setFilter(newFilter);
  const changeSortBy = (newSortBy) => setSortBy(newSortBy);

  useEffect(() => {
    const groceryList = localStorage.getItem("groceryList");
    if (groceryList) {
      setItems(JSON.parse(groceryList));
    }
  }, []);

  // This should automatically update localStorage whenever items change.
  // However, when the app loads, it accidentally stores the inital empty list to localStorage, which overwrites any existing data.
  /* useEffect(() =>{
    const updateGroceryList = () => localStorage.setItem("groceryList", JSON.stringify(items));
    updateGroceryList();
  }, [items]); */

  return (
    <>
      <main className="px-4 py-8">
        <Header title="Listahan" subtitle="A simple grocery list app"/>

        <AddItemDialog dialogRef={dialogRef} onClose={closeDialog} onAddItem={addItem} />

        <section className="flex flex-row gap-2 my-5 ">
          <ListFilter onSelect={changeFilter}/>
          <ListSorter onSelect={changeSortBy} />
          <button className="w-full rounded-lg bg-green-500 text-white text-center px-2 py-1" onClick={openDialog}>
            Add Item
          </button>
        </section>
        <GroceryList items={items} sortBy={sortBy} filter={filter} onDeleteItem={deleteItem} onToggleBought={toggleBought} />
      </main>
    </>
  )
}

export default App
