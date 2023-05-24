import express from "express";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import router from "./routers/userRoute.js";
import connect from "./config/database.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import cors from 'cors'


// Configurations
dotenv.config()
const app = express()

// Database
connect()

// Variables
const port = process.env.PORT || 5000

// Middlewares

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routers
app.use('/api/user', router)

app.get('/', (req, res) => res.json({ message: "Hello from Node js Backend" }))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`✔ Server Running on ${port}`);
})