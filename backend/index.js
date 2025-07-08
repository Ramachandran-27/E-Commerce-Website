import express from "express";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import db from "./config/db.js";

import AddressModel from "./models/addressModel.js";
import CartModel from "./models/cartModel.js";
import CategoryModel from "./models/categoryModel.js";
import OrderItemModel from "./models/orderItemModel.js";
import OrderModel from "./models/orderModel.js";
import PaymentModel from "./models/paymentModel.js";
import ProductImageModel from "./models/productImageModel.js";
import ProductModel from "./models/productModel.js";
import ProductSpecificationsModel from "./models/productSpecificationsModel.js";
import ReviewModel from "./models/reviewModel.js";
import UserModel from "./models/userModel.js";
import WishlistModel from "./models/wishlistModel.js";

import AddressController from "./controllers/addressController.js";
import CartController from "./controllers/cartController.js";
import CategoryController from "./controllers/categoryController.js";
import OrderController from "./controllers/orderController.js";
import PaymentController from "./controllers/paymentController.js";
import ProductController from "./controllers/productController.js";
import ReviewController from "./controllers/reviewController.js";
import UserController from "./controllers/userController.js";
import WishlistController from "./controllers/wishlistController.js";

import addressRoutes from "./routes/addressRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

const port = 8000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/images',express.static(path.join(__dirname,"public/images")));
db.connect();

const addressModel = new AddressModel(db);
const cartModel = new CartModel(db);
const categoryModel = new CategoryModel(db);
const orderItemModel = new OrderItemModel(db);
const orderModel = new OrderModel(db);
const paymentModel = new PaymentModel(db);
const productModel = new ProductModel(db);
const productImageModel = new ProductImageModel(db);
const productSpecificationsModel = new ProductSpecificationsModel(db);
const reviewModel = new ReviewModel(db);
const userModel = new UserModel(db);
const wishlistModel = new WishlistModel(db);


const addressController = new AddressController(addressModel);
const cartController = new CartController(cartModel);
const categoryController = new CategoryController(categoryModel);
const orderController = new OrderController(orderModel,orderItemModel);
const paymentController = new PaymentController(paymentModel);
const productController = new ProductController(productModel,productImageModel,productSpecificationsModel);
const reviewController = new ReviewController(reviewModel);
const userController = new UserController(userModel);
const wishlistController = new WishlistController(wishlistModel);


app.use("/address", addressRoutes(addressController));
app.use("/cart", cartRoutes(cartController));
app.use("/category", categoryRoutes(categoryController));
app.use("/orders", orderRoutes(orderController));
app.use("/payments", paymentRoutes(paymentController));
app.use("/products", productRoutes(productController));
app.use("/reviews", reviewRoutes(reviewController));
app.use("/users", userRoutes(userController));
app.use("/wishlist", wishlistRoutes(wishlistController));

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
});