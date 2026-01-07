const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");
const authRoutes=require("./routes/authRoutes");
const surveyRoutes=require("./routes/surveyRoutes");
dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/surveys", surveyRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=>console.log(err));

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`);
});
