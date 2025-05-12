import express from "express";
import cookieParsor from "cookie-parser"
import cors  from "cors"; 

import dotenv from "dotenv";
import condb from "./utils/db.js";

import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoutes from "./routes/job.routes.js";
// import applicationRoute from "./routes/application.routes.js";

import applicationRoutes from "./routes/application.routes.js";

// import { Job } from "./models/job.model.js";

dotenv.config({});
const app = express();

// app.get("/home", (req,res) =>{
//     return res.status(200).json({
//         message:"from backend",
//         success:"true"
//     })
// });

// mongodb+srv://<db_username>:<db_password>@cluster0.ioow1am.mongodb.net/

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParsor());

const corsOptions = {
    origin:'http://localhost:5173',
    credentials : true
}



app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
// const PORT = 3000;

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoutes);
app.use("/api/v1/application",applicationRoutes);

// "http://localhost:8080/api/v1/user/register"

app.listen(PORT, () =>{
    condb();
    console.log((`Server running at port ${PORT}`));
    
})