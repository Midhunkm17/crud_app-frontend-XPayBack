import { Route, Routes } from "react-router-dom";
import AddItem from "./components/AddItem";
import ItemView from "./components/ItemView";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AddItem/>}></Route>
        <Route path="/item-view" element={<ItemView/>}></Route>
      </Routes>
     
  
    </div>
  );
}

export default App;
