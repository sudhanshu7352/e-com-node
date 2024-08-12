import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { IProduct } from '../interfaces/Product';

interface CartProduct {
    product: IProduct;
    quantity: number;
}
const Cart = () => {
    const [cart, setCart] = useState<any>(null);
    const [shippingAddress, setShippingAddress] = useState('');

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await api.get('/cart');
                setCart(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCart();
    }, []);

    const handleCheckout = async () => {
        try {
            await api.post('/cart/checkout', { shippingAddress });
            alert('Checkout successful');
        } catch (err) {
            console.error(err);
            alert('Checkout failed');
        }
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cart?.products.map((item: CartProduct) => (
                <div key={item.product._id}>
                    <h3>{item.product.title}</h3>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
            <input type="text" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} placeholder="Shipping Address" required />
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default Cart;
