import mongoose from "mongoose";

export default function connectDB(){
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("already connected");
            return;
         }
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;
        

        connection.on('connected',()=>{
            console.log('MongoDB Connected!');
        })

        connection.on('error',(err)=>{
            console.log('Something when wrong while connecting to server!'+err);
        })
    } catch (error) {
         console.log('something went wrong!');
         console.log(error);
         
    }
}