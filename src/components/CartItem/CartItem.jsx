import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import './CartItem.css';

const CartItem = ({ id, name, price, quantity, image }) => {
  const { removeItem } = useContext(CartContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleRemove = () => {
    removeItem(id);
  };

  const subtotal = price * quantity;

  return (
    <tr className="cart-item">
      <td className="cart-item-image">
        <img src={image} alt={name} />
      </td>
      <td className="cart-item-name">{name}</td>
      <td className="cart-item-price">{formatPrice(price)}</td>
      <td className="cart-item-quantity">{quantity}</td>
      <td className="cart-item-subtotal">{formatPrice(subtotal)}</td>
      <td className="cart-item-remove">
        <button 
          className="btn btn-sm btn-danger"
          onClick={handleRemove}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
