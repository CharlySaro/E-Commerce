import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';

const ItemDetail = ({ id, name, category, price, description, image, stock }) => {
  // Formatear precio en pesos colombianos
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Traducir categoría
  const getCategoryName = (cat) => {
    const categories = {
      nakeds: 'Nakeds',
      deportivas: 'Deportivas',
      enduro: 'Enduro'
    };
    return categories[cat] || cat;
  };

  const handleAddToCart = (quantity) => {
    console.log(`Agregado al carrito: ${quantity} unidades de ${name}`);
    alert(`¡Se agregaron ${quantity} unidades de ${name} al carrito!`);
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
            <ItemCount stock={stock} initial={1} onAdd={handleAddToCart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
