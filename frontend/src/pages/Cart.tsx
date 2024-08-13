import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { IProduct } from '../interfaces/Product';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './cart.css'
interface CartProduct {
    productId: IProduct;
    quantity: number;
    _id: string;
    user: string;
}
const Cart = () => {
    const [cart, setCart] = useState<any>(null);
    const [shippingAddress, setShippingAddress] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found, please login');
                }
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/cart`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.data.message === 'Your cart is empty') {
                    // setCart([]);
                    alert(res.data.message);
                }
                console.log("res >>", res.data)
                setCart(res.data.products);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response && err.response.status === 401) {
                        alert('Session expired or unauthorized, please login again');
                        navigate('/login');
                    }
                }
            }
        };
        fetchCart();
    }, []);

    const handleCheckout = async () => {
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/cart/checkout`,
                { shippingAddress },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert('Checkout successful, you will receive a confirmation mail.');
            setShippingAddress('');
            setTimeout(() => {
                navigate('/products');
            }, 3000);
        } catch (err) {
            console.error(err);
            alert('Checkout failed');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="cart-container">
                <h2 className="cart-title">Your Cart</h2>
                {cart?.message ? (
                    <h2 className="cart-message">{cart.message}</h2>
                ) : (
                    <div className="cart-items">
                        {cart?.map((item: CartProduct) => (
                            <div className="cart-item" key={item._id}>
                                <h3 className="cart-item-title">{item.productId.title}</h3>
                                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                            </div>
                        ))}
                        <input
                            type="text"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            placeholder="Shipping Address"
                            required
                            className="cart-shipping-input"
                        />
                        <button className="cart-checkout-button" onClick={handleCheckout}>Checkout</button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Cart;
