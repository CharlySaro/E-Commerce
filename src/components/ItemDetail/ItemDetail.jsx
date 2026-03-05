import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { CartContext } from '../../context/CartContext';
import './ItemDetail.css';

const ItemDetail = ({ id, name, category, price, description, image, stock }) => {
  const { addItem } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getCategoryName = (cat) => {
    const categories = {
      nakeds: 'Nakeds',
      deportivas: 'Deportivas',
      enduro: 'Enduro'
    };
    return categories[cat] || cat;
  };

  const handleAddToCart = (quantity) => {
    addItem({ id, name, price, image, stock }, quantity);
    setIsAdded(true);
  };

  return (
    <div className="item-detail">
      <Link to="/" className="back-link">← Volver al catálogo</Link>
      
      <div className="detail-container">
        <div className="detail-image-container">
          <img src={image} alt={name} className="detail-image" />
        </div>
        
        <div className="detail-info">
          <span className="detail-category">{getCategoryName(category)}</span>
          <h1 className="detail-name">{name}</h1>
          <p className="detail-price">{formatPrice(price)}</p>
          <p className="detail-description">{description}</p>
          
          <div className="detail-stock">
            <strong>Stock disponible:</strong> {stock} unidades
          </div>

          <div className="detail-counter">
            {!isAdded ? (
              <ItemCount stock={stock} initial={1} onAdd={handleAddToCart} />
            ) : (
              <div className="added-to-cart">
                <p className="success-message">✓ Agregado al carrito</p>
                <Link to="/cart" className="btn btn-primary">Ir al carrito</Link>
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => setIsAdded(false)}
                >
                  Agregar más
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
