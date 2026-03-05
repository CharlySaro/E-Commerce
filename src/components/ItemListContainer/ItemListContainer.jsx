import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../../services/firebase';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      try {
        const response = categoryId 
          ? await getProductsByCategory(categoryId)
          : await getProducts();
        setProducts(response);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  const getCategoryTitle = () => {
    if (!categoryId) return 'Todas las Motos';
    const titles = {
      nakeds: 'Motos Nakeds',
      deportivas: 'Motos Deportivas',
      enduro: 'Motos Enduro'
    };
    return titles[categoryId] || 'Productos';
  };

  return (
    <div className="item-list-container">
      {greeting && <h2 className="greeting">{greeting}</h2>}
      <h1 className="category-title">{getCategoryTitle()}</h1>
      {products.length > 0 ? (
        <ItemList products={products} />
      ) : (
        <p className="no-products">No hay productos disponibles en esta categoría.</p>
      )}
    </div>
  );
};

export default ItemListContainer;
