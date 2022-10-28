import ItemCount from "../ItemCount/ItemCount";
import {useContext, useState} from 'react';
import {CartContext} from '../../context/cartContext';
import './Styles.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


export const ItemDetail = ({product}) => {
  const MySwal = withReactContent(Swal);
  const {addToCart} = useContext(CartContext);
  const [count,setCount] = useState(1);


  function onAdd(product) {
    addToCart(product,count)
    MySwal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Tu producto ${product.title} se añadio correctamente`,
      showConfirmButton: false,
      timer: 1500
    })
  };
  

  return (
    <div className="itemDetail">
      <div className="img-detail-cont">
        <img src={product.image} alt={product.title} className="img-detail" />
      </div>
      <div className="text-container">
        <div className="titulo-container">
            <h1>{product.title}</h1>
            
            <h3 style={{color: "black"}}>${product.price}</h3>
        </div>
        
        
        <ItemCount stock={product.stock} precio={product.price} count={count} setCount={setCount}/>
        <button className="button" onClick={() => onAdd(product)}> AGREGAR AL CARRITO</button>
       
      </div>
    </div>
  );

}

export default ItemDetail;