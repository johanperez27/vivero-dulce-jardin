import './Styles.css';

const Item = ({title,price,image,category}) => {

  return (
    <div className="Card item">
      <img src={image}alt={title} />
      <div className="card-body div-texto">
        <h4 className="card-title h4">{title}</h4>
        <p id="p">${price}</p>
      </div>
    </div>
  )
    

};

export default Item;