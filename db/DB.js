const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("MongoDB Connected successfully :) ");
    } catch (error) {
        console.log("Error occur while connecting to DataBase :( ", error);
    }
}

module.exports = connectDB;