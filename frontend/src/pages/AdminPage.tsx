import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get(`${process.env.REACT_APP_API_URL}/products`);
                setProducts(res.data);
            } catch (err) {
                console.error(err);
                if (axios.isAxiosError(err)) {
                    if (err.response && err.response.status === 401) {
                        alert('Session expired or unauthorized, please login again');
                        navigate('/login');
                    }
                }
            }
        };
        fetchProducts();
    }, []);

    const handleAddProduct = async () => {
        if (!title || !description || !price || !image) return alert("All fields are required");

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price.toString());
        formData.append('image', image);
        console.log("image", image)
        try {
            const res = await api.post(`${process.env.REACT_APP_API_URL}/products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Axios handles this automatically
                },
            });
            setProducts([...products, res.data]);
            console.log("resdata", res.data)
            setTitle('');
            setDescription('');
            setPrice(0);
            setImage(null);
            alert("Product added sucessfully")
        } catch (err) {
            console.error(err);
            alert('Failed to add product');
        }
    };

    const handleEditProduct = async (productId: string) => {
        const product = products.find(p => p._id === productId);
        if (!product) return;

        const updatedTitle = prompt('Enter new title', product.title) || product.title;
        const updatedDescription = prompt('Enter new description', product.description) || product.description;
        const updatedPrice = parseFloat(prompt('Enter new price', product.price.toString()) || product.price);

        try {
            await api.put(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
                title: updatedTitle,
                description: updatedDescription,
                price: updatedPrice
            });
            setProducts(products.map(p => p._id === productId ? { ...p, title: updatedTitle, description: updatedDescription, price: updatedPrice } : p));
        } catch (err) {
            console.error(err);
            alert('Failed to edit product');
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await api.delete(`${process.env.REACT_APP_API_URL}/products/${productId}`);
            setProducts(products.filter(p => p._id !== productId));
        } catch (err) {
            console.error(err);
            alert('Failed to delete product');
        }
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <div>
            <h1>Admin Panel</h1>
            <h2>Add New Product</h2>
            <button onClick={() => handleLogout()}>
                Logout
            </button>
            <div>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
                <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
                <button onClick={handleAddProduct}>Add Product</button>
            </div>

            <h2>Existing Products</h2>
            <div className="el_container">
                {products.map((product) => (
                    <div key={product._id}>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <p>{product.price}</p>
                        <img src={product.image} alt='product' />
                        <button onClick={() => handleEditProduct(product._id)}>Edit</button>
                        <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
