const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname)));

app.listen(6060, console.log("Boxfield server is listening on Port 6060"));
