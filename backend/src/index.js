import dotenv from "dotenv"
import connectDB from "./db/index.js";
import userRoutes from './routes/user.routes.js';
import teamRoutes from './routes/team.routes.js';
import express from "express";
import cors from "cors";



const app = express();
app.use(express.json());
// const PORT = process.env.PORT ||5000;

//Cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

dotenv.config({
    path: './.env'
})

// Routes
app.use('/api',userRoutes);
app.use('/api',teamRoutes);

// mongo
connectDB()
.then(() =>{
    app.listen(process.env.PORT || 5000, () =>{
        console.log(`Server is running at port : ${process.env.PORT}`); 
    })
})
.catch((err) => {
    console.log("MONGO db connection fail!!!" , err);
})
