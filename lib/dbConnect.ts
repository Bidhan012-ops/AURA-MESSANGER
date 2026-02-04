import mongoose from "mongoose";
const MONGO_URL=process.env.MONGO_URI||"";
type connectionobject={
     isconnected?:number
}
const connection:connectionobject={};
 export const dbConnect = async () => {
    if (connection.isconnected) {
        console.log("Already connected to MongoDB");
        return;
    }
    try {
        const db = await mongoose.connect(MONGO_URL);
        connection.isconnected = db.connections[0].readyState;
        console.log("the object is here",db.connections[0].readyState);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

