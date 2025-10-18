require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/DB");
const PORT = process.env.PORT || 8000;
const userRouter = require("./Routes/userRoute");
const blogRouter = require("./Routes/blogRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const partnerRouter = require("./Routes/partnerRoute");
const mailRoute = require("./Routes/sendingMailRoute");
const googleSheetRoute = require("./Routes/googleSheetRoute");

// connecting with DB :)
connectDB();

// cors 
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}))

// Middleware :)
app.use(express.json());
app.use(cookieParser());

// Routes :)
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/partner", partnerRouter);
app.use("/api/v1/contactus",mailRoute);
app.use("/api/v1/g",googleSheetRoute);

// Strating Server :)
app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT} `)
});