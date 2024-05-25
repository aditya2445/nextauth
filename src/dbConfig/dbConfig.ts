import { error, log } from "console";
import mongoose from "mongoose";

export async function connect(){
    try{
        //you can use if else case or simply put a exclamatory mark
        //read about all the event listeners in connection.{...}
        mongoose.connect(process.env.MONGO_URI!)
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDB Connected");
        })
        connection.on('error',()=>{
            console.log("mongoDB connection error please make sure db is up and running"+error);
            process.exit();
            
        })
    }catch(error){
        console.log("something went wrong during the connection to database",error);
    }
}