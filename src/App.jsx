import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import AddItemDialog from "./components/AddItemDialog";
import GroceryList from "./components/GroceryList";
import Header from "./components/Header";
import ListFilter from "./components/ListFilter";
import ListSorter from "./components/ListSorter";
import { useItemContext } from "./hooks/useItemContext";

function App() {
  const {items, dispatch} = useItemContext();
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);

  const showToast = (message, status) => {
    if(status === "success"){
      toast.success(message);
    }else{
      toast.error(message);
    }
  } 

  const dialogRef = useRef(null);
  const openDialog = () => {
    dialogRef.current.showModal();
    setIsAddItemDialogOpen(true);
  }

  const closeDialog = () => {
    dialogRef.current.close();
    setIsAddItemDialogOpen(false);
  }

/*   const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    showToast("Item removed!", "success");
  }; */

/*   const toggleBought = (id) =>{
    setItems(items.map(item => 
      item.id === id ? {...item, isBought: !item.isBought} : item
    ));
  } */

  const changeFilter = (newFilter) => setFilter(newFilter);
  const changeSortBy = (newSortBy) => setSortBy(newSortBy);

  return (
    <>
      <main className="px-4 py-8">
        <Header title="Listahan" subtitle="A simple grocery list app"/>

        <AddItemDialog 
          isOpen={isAddItemDialogOpen} 
          dialogRef={dialogRef} 
          onClose={closeDialog} 
          onNotify={showToast}
        />

        <section className="flex flex-row gap-2 my-5 ">
          <ListFilter onSelect={changeFilter}/>
          <ListSorter onSelect={changeSortBy} />
          <button className="w-full rounded-lg bg-green-500 text-white text-center px-2 py-1" onClick={openDialog}>
            Add Item
          </button>
        </section>
        <GroceryList items={items} sortBy={sortBy} filter={filter} />

        <Toaster 
          position="bottom-center"
          toastOptions={{
            duration: 2000,
            removeDelay: 1000,
          }}
        />
      </main>
    </>
  )
}

export default App
