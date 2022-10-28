import {useContext, useState} from 'react';
import {CartContext} from "../../context/cartContext"
import { Link } from 'react-router-dom';
import moment from 'moment';
import {collection,addDoc,getFirestore,updateDoc,doc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Styles.css';

const Cart = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate()
  const {cart,addToCart,removeItem,clear,total} = useContext(CartContext);
  const [order,setOrder] = useState({
    buyer:{
      name:'', 
      phone:0,
      email:''
    },
    items:cart,
    total:  cart.reduce((acc, item)=>acc+item.price*item.quantity,0),
    date: moment().format('DD/MM/YY, h:mm:ss a'),
  })
  
  const db= getFirestore();

  const createOrder = ()=> {
    
    setOrder((currentOrder)=>{
      return {
        ...currentOrder,
        items:cart,
        total: cart.reduce((acc, item)=>acc+item.price*item.quantity,0),
        date: moment().format('DD/MM/YY, h:mm:ss a'),
      }

    })

    const query = collection(db,'orders');
    addDoc(query,order)
    .then(({id})=>{
      updateStockProducts()
      MySwal.fire({
        icon: 'success',
        title: 'Compra realizada con exito',
        html: `Total de la compra: $${order.total}<br>Código de compra: ${id}`,
        showConfirmButton: true,
        });
    })
    .catch(()=>alert('no pudo completar su compra, intente luego'));
  };

  const submitOrder = (e) => {
    e.preventDefault();
    if (!order.buyer.name || !order.buyer.email || !order.buyer.phone) {
        MySwal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Los campos no pueden estar vacíos',
            footer: 'Formulario'
        });
    }  else {
        createOrder();
    }    
  }

  const updateStockProducts = () => {

    cart.forEach(product => {
      const queryUpdate = doc(db,'items',product.id);
      updateDoc(queryUpdate,{
        categoryId: product.categoryId,
        description: product.description,
        image: product.image,
        price: product.price,
        title: product.title,
        stock: product.stock - product.quantity
      }).then(()=>{
        if(cart[cart.length-1].id===product.id){
          clear()
          navigate('/')
        };
      }).catch(()=>{
        console.log('error al actualizar el stock');
      })
    });

  };

  const handleInputChange= (e) => {
    setOrder({
      ...order,
      buyer:{
        ...order.buyer,
        [e.target.name]:e.target.value,
      }
    });
  };
  
  const totalf= cart.reduce((acc, item)=>acc+item.price*item.quantity,0)


  return (
    <div>
      <h1>Carrito</h1>
      {cart.length ===0?(
        <>
          <h2>No hay productos en tu carrito</h2>
          <Link to="/" >Volver a Comprar</Link>
        </>

      ):(
        <>
          <button onClick={()=>clear()}>Vaciar carrito</button>
          <div className='listaItemsCart'>
              {cart.map((item) => (
                  <div className='itemCart' key={item.id}>
                      <img src={item.image} alt="title" />
                      <h2>{item.title}</h2>
                      <h3>{item.stage}</h3>
                      <h4>Precio: ${item.price}</h4>
                      <h4>Cantidad: {item.quantity}</h4>
                      <button onClick={()=>removeItem(item.id)}>Remover</button>
                  </div>
              ))}
          </div>
          <div>
              <h4 style={{margin: "10px 10px 20px 10px"}}>Total de la compra: ${totalf}</h4>
          </div>
          <form className='formOrder' onSubmit={submitOrder}>
                    <fieldset>
                        <legend>Orden</legend>
                        <div>
                            <label htmlFor="name">Nombre </label>
                            <input id="name" name="name" type="name" value={order.buyer.name} onChange={handleInputChange}></input>
                        </div>
                        <div>
                            <label htmlFor="phone">Telefono </label>
                            <input id="phone" name="phone" type="number" value={order.buyer.phone} onChange={handleInputChange}></input>
                        </div>
                        <div>
                            <label htmlFor="email">E-mail </label>
                            <input id="email" name="email" type="email" value={order.buyer.email} onChange={handleInputChange}></input>
                        </div>
                        <button type="submit" onClick={createOrder} >Crear orden</button>
                    </fieldset>
                </form>
        </>
      )}

    </div>
  )
}

export default Cart


//debo borrar de firebase el campo id y el campo quantity
//para que se vea como en la foto de pantalla
