require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");
const database = require("./config/database");

// Import Routes
const userRoutes = require("./routes/userRoute");
const profileRoutes = require("./routes/profileRoute");
const paymentRoutes = require("./routes/paymentRoute");
const courseRoutes = require("./routes/courseRoute");
const adminRoutes = require("./routes/adminRoute");

const PORT = process.env.PORT || 4000;

// Database connection
database.conncetToDatabase();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Cloudinary connection
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/admin", adminRoutes);

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
