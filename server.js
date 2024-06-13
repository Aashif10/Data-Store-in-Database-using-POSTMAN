let express = require("express");
const { PORT } = require("./config");
const { connectDB } = require("./config/database");
const morgan = require("morgan");
const userRoute = require("./Routing/route");
const quoteRouter = require("./Routing/quoteRouter");
const { authenticate } = require("./MiddleWare/authenticate");
let cookieParser = require("cookie-parser");

const app = express();
const startServer = () => {
  connectDB();
  // Middleware
  app.use(express.json());
  app.use(morgan("dev"));
  app.use("/user", userRoute);
  app.use("/quote", authenticate, quoteRouter);
  app.use(cookieParser());

  // port listen
  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server running at http://localhost:9000`);
  });
};

startServer();
