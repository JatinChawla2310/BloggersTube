const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
var cors = require("cors");
app.use(cors());
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "/images")));

require("./db/db");
const port = process.env.PORT;
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/user", require("./routes/user"));

app.listen(port, () => {
  console.log(`Server Listening at http://localhost:${port}`);
});
