import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import searchRoutes from './routes/searchRoute.js';
dotenv.config();

await connectDB();

const PORT=process.env.PORT||5050;
const app=express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('AMR is running...');
})

app.use('/api/search',searchRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})