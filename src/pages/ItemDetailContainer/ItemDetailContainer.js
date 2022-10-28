import ItemDetail from "../../components/ItemDetail/ItemDetail"
import  {useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import {getFirestore,doc,getDoc} from 'firebase/firestore';


const ItemDetailContainer = () => {
  const {id}= useParams();
  const [product,setProduct] = useState();

  const db = getFirestore();


  const getProduct =  () => {
    const queryDoc = doc(db, 'items', id);

    getDoc(queryDoc)
    .then((res)=>{
      setProduct({id: res.id,...res.data()})})
    .catch((err) => console.log(err));
    
  };

  useEffect(() => {
    console.log(id);
    getProduct();
    //
  }, [id])

  return (
    <div>
      {product 
      ? (<ItemDetail product={product}/>)
      : (<h2>Obteniendo el Detalle</h2>)
    }
    </div>
  );
};

export default ItemDetailContainer;