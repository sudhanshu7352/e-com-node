import { Request } from 'express';

// declare module 'express-serve-static-core' {
export interface CustomRequest extends Request {
  userId?: string;
  userEmail?: string;
  user?: {
    userId: string,
    role: string
  },
  file?: {
    filename: string;
    originalname: string;
    mimetype: string;
    path: string;
    size: number;
  };
}
// }
