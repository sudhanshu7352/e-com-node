import React, { useEffect, useState } from 'react';
// import api from '../utils/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css"
import Navbar from './Navbar';
import AdminPage from './AdminPage';
const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found, please login');
        }
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

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
          setCartCount(0);
          // alert(res.data.message);
        } else {
          // setCart(res.data.products);
          const totalItems = res.data.products.reduce((count: any, item: { quantity: any; }) => count + item.quantity, 0);
          setCartCount(totalItems);
        }
      } catch (err) {
        console.error('Failed to fetch cart', err);

        if (axios.isAxiosError(err)) {
          if (err.response && err.response.status === 401) {
            alert('Session expired or unauthorized, please login again');
            navigate('/login');
          }
        } else {
          // Handle non-Axios errors
          alert('An unexpected error occurred');
        }
      }
    };

    fetchProducts();
    fetchCart();
  }, []);
  const addToCart = async (product: any) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/cart/add`,
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setCartCount((prevCount) => prevCount + 1);
    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };
  if (userRole === 'super-admin') {
    return <AdminPage />; // Render AdminPage if user is a super-admin
  }
  return (
    <div>

      <Navbar cartCount={cartCount} />

      {/* Product List */}
      <div className="el_container">
        {products.map((product) => (
          <div key={product._id} >
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <img src={`${process.env.REACT_APP_API_URL}/${product.image}`}
              alt={product.title} />
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
