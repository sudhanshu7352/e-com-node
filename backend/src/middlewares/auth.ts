import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user? : {
    userId?: any;
    role : string
  }
}

export const isAuthenticated = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // console.log("decoded :", decoded);
    req.user= (decoded as any);
   // req.user.role =(decoded as any).role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const isSuperAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  // console.log("auth request :", req.user)
  if (req.user && req.user.role !== 'super-admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
