import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import CartItem from '../CartItem/CartItem';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import './Cart.css';

const Cart = () => {
  const { cartItems, clearCart, getTotalPrice } = useContext(CartContext);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <Container className="cart-empty-container">
        <div className="cart-empty">
          <h2>Tu carrito está vacío</h2>
          <p>No hay productos en tu carrito aún</p>
          <Link to="/" className="btn btn-primary">
            Continuar comprando
          </Link>
        </div>
      </Container>
    );
  }

  const total = getTotalPrice();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Container className="cart-container py-5">
      <h1 className="cart-title mb-4">Mi Carrito</h1>
      
      <Table hover responsive className="cart-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              image={item.image}
            />
          ))}
        </tbody>
      </Table>

      <Row className="cart-summary mt-4">
        <Col md={8}></Col>
        <Col md={4}>
          <div className="summary-box">
            <div className="summary-row">
              <span>Items:</span>
              <span className="summary-value">{itemCount}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span className="summary-value">{formatPrice(total)}</span>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="cart-actions mt-4">
        <Col md={6}>
          <Link to="/" className="btn btn-outline-secondary w-100">
            Seguir comprando
          </Link>
        </Col>
        <Col md={6} className="text-end">
          <Link to="/checkout" className="btn btn-success w-100 me-2">
            Ir al checkout
          </Link>
        </Col>
      </Row>

      <div className="cart-danger-zone mt-4">
        <Button 
          variant="outline-danger"
          onClick={() => {
            if (window.confirm('¿Está seguro que desea vaciar el carrito?')) {
              clearCart();
            }
          }}
        >
          Vaciar carrito
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
