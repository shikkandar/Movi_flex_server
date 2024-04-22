import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_URL = process.env.DB_URL;

const connect = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connect;
