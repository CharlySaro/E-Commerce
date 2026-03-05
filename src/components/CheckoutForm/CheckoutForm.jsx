import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { createOrder } from '../../services/firebase';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import './CheckoutForm.css';

const CheckoutForm = () => {
  const { cartItems, getTotalPrice, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es requerido';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = 'Debe confirmar el email';
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Los emails no coinciden';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^\d{7,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'El teléfono debe tener al menos 7 dígitos';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'La ciudad es requerida';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'El código postal es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitError(null);

    try {
      const orderData = {
        buyer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: getTotalPrice(),
        status: 'pendiente'
      };

      const newOrderId = await createOrder(orderData);
      setOrderId(newOrderId);
      clearCart();
    } catch (error) {
      console.error('Error al crear la orden:', error);
      setSubmitError('Error al procesar el pedido. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0 && !orderId) {
    return (
      <Container className="checkout-empty">
        <h2>No hay productos en el carrito</h2>
        <Link to="/" className="btn btn-primary">Volver al catálogo</Link>
      </Container>
    );
  }

  if (orderId) {
    return (
      <Container className="checkout-success py-5">
        <div className="success-box">
          <h1>✓ ¡Pedido Confirmado!</h1>
          <p className="success-message">Tu compra ha sido procesada exitosamente</p>
          
          <div className="order-details">
            <h3>Número de Orden:</h3>
            <div className="order-id">{orderId}</div>
            <p className="order-info">Guarda este número para seguimiento de tu pedido</p>
          </div>

          <div className="next-steps">
            <p>Te hemos enviado un correo de confirmación a <strong>{formData.email}</strong></p>
            <p>Tu pedido será procesado en breve. Gracias por tu compra.</p>
          </div>

          <Link to="/" className="btn btn-primary btn-lg">
            Volver al catálogo
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="checkout-container py-5">
      <div className="checkout-wrapper">
        <div className="checkout-form-section">
          <h1 className="checkout-title">Checkout</h1>

          {submitError && (
            <Alert variant="danger" className="mb-4">
              {submitError}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} noValidate>
            <h3 className="section-title">Información Personal</h3>

            <div className="form-row">
              <Form.Group className="mb-3 col-md-6">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.firstName}
                  placeholder="Juan"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.lastName}
                  placeholder="Pérez"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={!!errors.email}
                placeholder="tu@email.com"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirmar Email</Form.Label>
              <Form.Control
                type="email"
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleInputChange}
                isInvalid={!!errors.confirmEmail}
                placeholder="tu@email.com"
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmEmail}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                isInvalid={!!errors.phone}
                placeholder="3001234567"
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <h3 className="section-title">Dirección de Envío</h3>

            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                isInvalid={!!errors.address}
                placeholder="Calle 123 #45-67"
              />
              <Form.Control.Feedback type="invalid">
                {errors.address}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="form-row">
              <Form.Group className="mb-3 col-md-6">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  isInvalid={!!errors.city}
                  placeholder="Bogotá"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  isInvalid={!!errors.postalCode}
                  placeholder="110111"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.postalCode}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="checkout-buttons">
              <Link to="/cart" className="btn btn-outline-secondary">
                Volver al carrito
              </Link>
              <Button 
                variant="success" 
                type="submit" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Procesando...
                  </>
                ) : (
                  'Completar Compra'
                )}
              </Button>
            </div>
          </Form>
        </div>

        <div className="checkout-summary">
          <h3>Resumen del Pedido</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty">x{item.quantity}</span>
                </div>
                <span className="item-price">
                  {new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0
                  }).format(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="summary-total">
            <span>Total:</span>
            <span>
              {new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
              }).format(getTotalPrice())}
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutForm;
