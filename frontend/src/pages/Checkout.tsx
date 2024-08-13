import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      await api.post('/cart/checkout', { shippingAddress });
      setMessage('Checkout successful!');
      setShippingAddress(''); 
      setTimeout(() => {
        navigate('/products'); 
      }, 3000); 
    } catch (err) {
      console.error(err);
      setMessage('Checkout failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCheckout();
        }}
      >
        <div>
          <label htmlFor="shippingAddress">Shipping Address</label>
          <input
            type="text"
            id="shippingAddress"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Checkout</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Checkout;
