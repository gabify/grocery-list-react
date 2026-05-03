import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import AddItemDialog from "./components/AddItemDialog";
import GroceryList from "./components/GroceryList";
import Header from "./components/Header";
import ListFilter from "./components/ListFilter";
import ListSorter from "./components/ListSorter";

function App() {
  const [items, setItems] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); //Checks if data is loaded from localStoage
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

  const addItem = (item) => setItems([...items, item]);

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    showToast("Item removed!", "success");
  };

  const toggleBought = (id) =>{
    setItems(items.map(item => 
      item.id === id ? {...item, isBought: !item.isBought} : item
    ));
  }

  const changeFilter = (newFilter) => setFilter(newFilter);
  const changeSortBy = (newSortBy) => setSortBy(newSortBy);

  useEffect(() => {
    const groceryList = localStorage.getItem("groceryList");
    if (groceryList) {
      setItems(JSON.parse(groceryList));
    }
    setIsDataLoaded(true);
  }, []);


  useEffect(() =>{
    const updateGroceryList = () => {
      if(!isDataLoaded) return;
      localStorage.setItem("groceryList", JSON.stringify(items));
    };

    updateGroceryList();
  }, [items, isDataLoaded]);

  return (
    <>
      <main className="px-4 py-8">
        <Header title="Listahan" subtitle="A simple grocery list app"/>

        <AddItemDialog 
          isOpen={isAddItemDialogOpen} 
          dialogRef={dialogRef} 
          onClose={closeDialog} 
          onAddItem={addItem} 
          onNotify={showToast}
        />

        <section className="flex flex-row gap-2 my-5 ">
          <ListFilter onSelect={changeFilter}/>
          <ListSorter onSelect={changeSortBy} />
          <button className="w-full rounded-lg bg-green-500 text-white text-center px-2 py-1" onClick={openDialog}>
            Add Item
          </button>
        </section>
        <GroceryList items={items} sortBy={sortBy} filter={filter} onDeleteItem={deleteItem} onToggleBought={toggleBought} />

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
