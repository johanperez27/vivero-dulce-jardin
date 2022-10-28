import './Styles.css';
import icono from './icono.png';
import iconoCart from './iconoCart.png'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (   
    /* 
    <div class="header">
        <img src={icono} alt="Imagen del logo" class="header_logo"/>

        <ul class="header_nav">
            <li ><a href="#" class="header_link">PRODUCTOS Y SERVICIOS</a></li>

            <li>
              <NavLink to={"/category/pantalones"} class="header_link">
                Pantalones
              </NavLink>
            </li>
            
            <li>
              <NavLink to={"/category/gorros"} class="header_link">
                Gorros
              </NavLink>
            </li>
        </ul>
    </div>
    */
    <div className="header">
      <NavLink to={"/" } >
        <img src={icono} alt="Imagen del logo" className="header_logo"/>
      </NavLink>



      <ul className="header_nav">

        <li>
          <NavLink to={"/category/Plantas_interiores"} className="header_link">
            Plantas interiores
          </NavLink>
        </li>

        <li>
          <NavLink to={"/category/Plantas_exteriores"} className="header_link">
            Plantas exteriores
          </NavLink>
        </li>

        <li >
          <NavLink to={"/cart" } >
            <img src={iconoCart} alt="Imagen del carrito" className="logo_cart"/>
          </NavLink>
          
        </li>



      </ul>

    </div>

  );
};

export default NavBar;