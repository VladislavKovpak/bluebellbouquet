import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, bestseller } = req.body
        
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=> item !==undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        const productData = {
            name, 
            description,
            price: Number(price),
            category,
            bestseller: bestseller === "true" ? true : false,
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData)

        const product = new productModel(productData);
        await product.save()

        res.json({success:true, message: "Product added"})

    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true, products})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message: "Product removed"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

//single product info
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true, product})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // Отримання ID продукту з параметрів маршруту
        const { name, description, price, category, bestseller } = req.body;

        // Обробка нових зображень, якщо вони були завантажені
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = [];
        if (images.length > 0) {
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                    return result.secure_url;
                })
            );
        }

        // Збирання даних для оновлення
        const updatedData = {
            ...(name && { name }),
            ...(description && { description }),
            ...(price && { price: Number(price) }),
            ...(category && { category }),
            ...(bestseller !== undefined && { bestseller: bestseller === "true" }),
            ...(imagesUrl.length > 0 && { image: imagesUrl }),
        };

        // Оновлення продукту в базі даних
        const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, {
            new: true, // Повертає оновлений документ
        });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product updated", product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



export { listProducts, addProduct, updateProduct, removeProduct, singleProduct }