const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const PORT = 5000;
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/comment");

const { sequelize, connectToDb } = require("./db");
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../blogify_client/public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/uploadImage", upload.single("file"), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename);
});

app.use("/api", blogRoutes);
app.use("/api", authRoutes);
app.use("/api", commentRoutes);

app.listen(PORT, () => {
  console.log("Server is Running on PORT 5000");
  connectToDb();
});
