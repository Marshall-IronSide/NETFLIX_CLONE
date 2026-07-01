import mongose from "mongoose";

export async function connectToDB() {
    try{
        const conn = await mongose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch(err){
        console.log("Error connecting to MongoDB:", err.message);
        process.exit(1);
    }
}