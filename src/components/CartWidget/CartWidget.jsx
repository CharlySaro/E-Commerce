import { LuShoppingCart } from "react-icons/lu";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import './CartWidget.css';

const CartWidget = () => {
  const { getTotalQuantity } = useContext(CartContext);
  const totalQuantity = getTotalQuantity();

  return (
    <Link to="/cart" className="cart-widget">
      <div className="cart-icon-container">
        <LuShoppingCart size={32} />
        {totalQuantity > 0 && (
          <span className="cart-badge">{totalQuantity}</span>
        )}
      </div>
    </Link>
  )
}

export default CartWidget
