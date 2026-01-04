const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");
const authRoutes=require("./routes/authRoutes");

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=>console.log(err));

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`);
});
