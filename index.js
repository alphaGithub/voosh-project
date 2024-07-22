require("dotenv").config();
const express = require("express");
const registerRoutes = require("./routers");
const { mongoInit } = require("./database/mongodb");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./core/errorMiddleWare");
const corsMiddleWare = require("./core/corsMiddleWare");

const main = async () => {
  try {
    const app = express();
    await mongoInit();
    app.use(express.static("public"));
    app.use(cookieParser());
    app.use(corsMiddleWare);
    app.use(bodyParser.json({ limit: "5mb" }));
    registerRoutes(app);
    app.use(errorMiddleware);
    return app;
  } catch (error) {
    throw new Error("[err] error in main!", error);
  }
};
main().then((app) => {
  const port = process.env.PORT || 3123;
  app.listen(port, () => {
    console.log(`[msg] server started... : PORT - ${port}`);
  });
});
