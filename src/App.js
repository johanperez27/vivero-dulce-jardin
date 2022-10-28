import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import ItemListContainers from './pages/ItemListContainers/ItemListContainers';
import ItemDetailContainer from './pages/ItemDetailContainer/ItemDetailContainer'
import {CartProvider} from './context/CartProvider'
import Cart from './components/Cart/Cart'

function App() {
  return (
      <CartProvider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path="/" element={<ItemListContainers/>} />
            <Route path="/contact" element={<div>contact</div>} />
            <Route path="detail/:id" element={<ItemDetailContainer/>} />
            <Route path="category/:categoryName" element={<ItemListContainers/>}/>
            <Route path="cart" element={<Cart/>} />
            
          </Routes>
        </BrowserRouter> 
      </CartProvider>
      
  );
}

export default App;
