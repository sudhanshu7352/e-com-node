import { Request, Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';
import nodemailer from 'nodemailer';
import { CustomRequest } from '../../types/express';
import Checkout from '../models/Checkout';
import { calculateTotalPrice } from '../utils/cartTotal';


export const getCart = async (req: CustomRequest, res: Response) => {
  try {
    // console.log("re user id :",req.user?.userId )
    const cart = await Cart.findOne({ user: req.user?.userId })
      .populate('products.productId') // Populate the product details
      .exec();

      if (!cart) {
        return res.status(200).json({ message: 'Your cart is empty' });
    }

    res.status(200).json(cart);
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

export const addToCart = async (req: CustomRequest, res: Response) => {
  console.log("req:", req.body)
  const { productId, quantity } = req.body;
  const userId = req.user?.userId;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, products: [{ productId, quantity }] });
    } else {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex >= 0) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }
    await cart.save();
    res.json(cart);
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

export const checkoutCart = async (req: CustomRequest, res: Response) => {
  const { shippingAddress } = req.body;
  const userId = req.user?.userId;
  //  console.log("req: ",req.user)
  try {
    let cart = await Cart.findOne({ user: userId }).populate('products.productId');
    if (!cart || cart.products.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    const totalPrice = calculateTotalPrice(cart.products);
    // console.log("cart :", cart.products)
    const newCheckout = new Checkout({
      user: userId,
      products: cart.products,
      shippingAddress,
      totalPrice,
      status: 'pending'
    });

    await newCheckout.save();

    console.log(req.user)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      // secure: true,
      // port :465,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.user?.email,
      subject: 'Order Confirmation',
      text: `Your order of ₹ ${totalPrice} has been confirmed and will be shipped to: ${shippingAddress}`
    });

    cart.products = [];
    await cart.save();
    res.json({ message: 'Checkout successful', "items": newCheckout });
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
