import mongoose, { Schema, Document } from 'mongoose';

export interface ICheckout extends Document {
    user: string;
    products: Array<{ productId: string; quantity: number }>;
    shippingAddress: string;
    totalPrice: number;
    status: string;
    createdAt: Date;
}

const CheckoutSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 }
    }],
    shippingAddress: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ICheckout>('Checkout', CheckoutSchema);
