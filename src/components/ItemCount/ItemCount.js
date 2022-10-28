
import './Styles.css';

const ItemCount = ({stock,count,setCount}) => {
  

  const incrementar = ()=>{
    if (count < stock){
      setCount(count+1);
    }

  };

  const decrementar = ()=>{
    if (count > 0){
      setCount(count-1);
    }
  };

  return (
    <div className="Contenedor">
        <p>Cantidad</p>
        <h3>{count}</h3>
        <div className="direction">
          <button type="button" onClick={decrementar}>-</button>
          <button type="button" onClick={incrementar}>+</button>
        </div>
    </div>
);
};

export default ItemCount;