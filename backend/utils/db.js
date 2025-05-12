import mongoose from "mongoose";
const condb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to Mongodb");
    } catch (error) {
        console.log("error while connecting" , error);
    }
}
export default condb;