import { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAdd = () => {
    if (stock > 0) {
      onAdd(count);
    }
  };

  return (
    <div className="item-count">
      <div className="count-controls">
        <button 
          className="count-button" 
          onClick={handleDecrement}
          disabled={count <= 1}
        >
          -
        </button>
        <span className="count-display">{count}</span>
        <button 
          className="count-button" 
          onClick={handleIncrement}
          disabled={count >= stock}
        >
          +
        </button>
      </div>
      <button 
        className="add-to-cart-button" 
        onClick={handleAdd}
        disabled={stock === 0}
      >
        {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
      </button>
    </div>
  );
};

export default ItemCount;
