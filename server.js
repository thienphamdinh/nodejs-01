const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose.set("useCreateIndex", true);

mongoose
  .connect("mongodb://localhost:27017/node01", { useNewUrlParser: true })
  .then(() => console.log("connect"))
  .catch(err => console.log(err));
// middlewares
// paser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
// router
app.use("/api/users", require("./routes/api/users"));

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log("App listening " + port);
});
