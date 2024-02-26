const express = require('express');
const APP_SERVER = express();

APP_SERVER.use("/api",require("./Routes/Route"));



module.exports = APP_SERVER;