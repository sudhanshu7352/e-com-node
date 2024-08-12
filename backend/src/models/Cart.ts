import mongoose, { Schema, Document } from 'mongoose';

export interface IProd {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    __v: number;
}
export interface ICart extends Document {
    user: string;
    products: Array<{ productId: string | IProd; quantity: number }>;
    
}

const CartSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 }
    }]
});

export default mongoose.model<ICart>('Cart', CartSchema);
