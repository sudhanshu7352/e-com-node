import { Request, Response } from 'express';
import Product from '../models/Product';
import { CustomRequest } from '../../types/express';

export const addProduct = async (req: CustomRequest, res: Response) => {
    const { title, description, price } = req.body;
    const image = req.file?.path;
    // console.log("rqf",req.file);
    if (!image) {
        return res.status(400).json({ error: 'Image upload failed. Please try again.' });
    }
    try {
        const newProduct = new Product({ title, description, price, image });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message); 
            res.status(500).json({ error: error.message }); 
        } else {
            console.log('Unexpected error:', error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

export const getProducts = async (_req: CustomRequest, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;

    try {
        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message); 
            res.status(500).json({ error: error.message }); 
        } else {
            console.log('Unexpected error:', error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};

// Update a product
export const updateProduct = async (req: CustomRequest, res: Response) => {
    const productId = req.params.id;
    const { title, description, price } = req.body;
    console.log(req.body, productId)
    const image = req.file?.path;
    try {
        const product = await Product.findByIdAndUpdate(
            productId,
            { title, description, price, image },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message); 
            res.status(500).json({ error: error.message }); 
        } else {
            console.log('Unexpected error:', error);
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};