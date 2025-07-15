import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

app.use(express.json())

const corsOptionsDelegate = function (req, callback) {
    const corsOptions = {
        origin: false,
        methods: 'OPTIONS,GET,PUT,POST,DELETE',
        credentials: true
    };
    console.log(req.header('Origin'))
    corsOptions.origin = false;
    callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)

app.get('/', (req, res)=>{
    res.send("API Working")
})

app.listen(port, ()=> console.log("server started on PORT:" + port))
