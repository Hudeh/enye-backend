const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const routerRate = require("./routerRate");

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use("/api", routerRate);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
