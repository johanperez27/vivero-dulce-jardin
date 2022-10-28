import { useState} from "react";
import {CartContext} from "./cartContext"

export const CartProvider = ({children}) => {
  const [cart,setCart] = useState([]);

  const addToCart = (item, quantity) =>{
    if (isInCart(item.id)) {
      alert("ya esta en el carrito");
    }else{
      setCart([...cart, {...item,quantity}]);
    }
    console.log('cart',[...cart,{...item,quantity}]);
  };

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  const clear = () => {
    setCart([]);
  };

  const removeItem = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  //falta hacer la de remover item

  return (
    <CartContext.Provider value={{cart, addToCart, removeItem,clear}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;