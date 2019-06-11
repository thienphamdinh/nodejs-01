const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/node01", { useNewUrlParser: true })
  .then(() => console.log("connect"))
  .catch(err => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}!;`);
});
