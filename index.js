const express = require("express");
const app = express();
require("dotenv").config();
const Port = process.env.PORT || 4000;

app.use(express.json());
require("./Configuration/database").DBConnect();
const user = require("./Routes/index");
app.use("api/v1/", user);

app.listen(Port, () => {
    console.log(`Server Started Successfully at port ${Port}`);
});