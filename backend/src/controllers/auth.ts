import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { TUser } from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' , newUser });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message); // Log the error message
      res.status(500).json({ error: error.message }); // Send the error message in the response
    } else {
      console.log('Unexpected error:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role}, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.json({ token, message: `Hello, ${email}!` });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
