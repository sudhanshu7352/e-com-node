import { IProd } from "../models/Cart";


export const calculateTotalPrice = (products: Array<{ productId: string | IProd; quantity: number }>): number => {

    console.log("totalprice :", products)
    let total = 0;
    products.forEach(item => {
        if (typeof item.productId === 'object') {
            // When productId is populated
            total += item.quantity * item.productId.price;
        }
    });
    return total;
};