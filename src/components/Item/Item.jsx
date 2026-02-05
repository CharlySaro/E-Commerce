import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ id, name, price, image, stock }) => {
  // Formatear precio en pesos colombianos
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="item-card">
      <img src={image} alt={name} className="item-image" />
      <div className="item-content">
        <h3 className="item-name">{name}</h3>
        <p className="item-price">{formatPrice(price)}</p>
        <p className="item-stock">Stock disponible: {stock}</p>
        <Link to={`/item/${id}`} className="item-link">
          Ver detalle
        </Link>
      </div>
    </div>
  );
};

export default Item;
