
import Item from "../Item/Item";
import {Link} from 'react-router-dom';
import './Styles.css';

const ItemList = ({lista}) => {
  
  return (
    <div className="itemList">
      {
        lista.map(item =>(
          <Link
            key={item.id}
            to={`/detail/${item.id}`}
            style={{textDecoration: 'none'}}
            >
              <Item
                title={item.title}
                price={item.price}
                category={item.category}
                description={item.description}
                image={item.image}
              />
          </Link>

        ))
      }
    </div>
  );
}

export default ItemList;