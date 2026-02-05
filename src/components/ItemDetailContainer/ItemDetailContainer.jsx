import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../data/products';
import ItemDetail from '../ItemDetail/ItemDetail';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getProductById(id)
      .then(response => {
        if (response) {
          setProduct(response);
        } else {
          setError(true);
        }
      })
      .catch(err => {
        console.error('Error al cargar el producto:', err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o no está disponible.</p>
      </div>
    );
  }

  return <ItemDetail {...product} />;
};

export default ItemDetailContainer;
