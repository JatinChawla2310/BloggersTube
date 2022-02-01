const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo successfully"))
  .catch((err) => console.log("no connection"));
