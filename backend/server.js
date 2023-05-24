import express from "express";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import router from "./routers/userRoute.js";
import postRouter from "./routers/postRoute.js";
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
    origin: process.env.NODE_ENV === "development" ? 'http://localhost:3000/' : process.env.FRONTEND_URL,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routers
app.use('/api/user', router)
app.use('/api/post', postRouter)

app.get('/', (req, res) => res.json({ message: "Hello from Node js Backend" }))

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`✔ Server Running on ${port}`);
})