import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'
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
    corsOptions.origin = req.header('Origin');
    callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)

app.get('/api', (req, res) => {
    res.send("API Working")
})

const __dirname = path.resolve(); 
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => console.log("server started on PORT:" + port))

