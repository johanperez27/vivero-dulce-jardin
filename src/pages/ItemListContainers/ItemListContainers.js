import { useEffect, useState } from 'react';
import ItemList from '../../components/ItemList.js/ItemList'
import './Styles.css';
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom';
import {getFirestore,getDocs,collection,query,where} from 'firebase/firestore';


const ItemListContainers = ({}) => {

  const [List,setList] = useState([]);
  const {categoryName} = useParams();
  


  const getProducts = () => {
    const db = getFirestore();
    const queryBase = collection(db,'items');
    const querySnapshot = categoryName ? query(queryBase,where('categoryId','==',categoryName)) :queryBase;

    getDocs(querySnapshot).then(response => {
      const data = response.docs.map((product) => {
        return {id: product.id, ...product.data()};
      })
      setList(data);
    })
  }
  
  useEffect(()=>{
    getProducts();
  },[categoryName])

  return (
    <div >
      <ItemList lista={List} className="containerList" />
    </div>
  );
};

export default ItemListContainers;