import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct, updateProduct } from '../controllers/productController.js'; 
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Маршрут для додавання продукту
productRouter.post(
    '/add', 
    adminAuth, 
    upload.fields([
        { name: 'image1', maxCount: 1 }, 
        { name: 'image2', maxCount: 1 }, 
        { name: 'image3', maxCount: 1 }, 
        { name: 'image4', maxCount: 1 }
    ]), 
    addProduct
);

// Маршрут для видалення продукту
productRouter.post('/remove', adminAuth, removeProduct);

// Маршрут для отримання даних про окремий продукт
productRouter.post('/single', singleProduct);

// Маршрут для отримання списку продуктів
productRouter.get('/list', listProducts);

// Маршрут для оновлення продукту
productRouter.put(
    '/update/:id', 
    adminAuth, 
    upload.fields([
        { name: 'image1', maxCount: 1 }, 
        { name: 'image2', maxCount: 1 }, 
        { name: 'image3', maxCount: 1 }, 
        { name: 'image4', maxCount: 1 }
    ]), 
    updateProduct
);

export default productRouter;
