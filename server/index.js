require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./router/auth-router.js");
const contactRouter = require("./router/contact-router.js");
const connectDB = require("./utility/db.js");
const errorMiddleware = require("./middlewares/error-middleware.js");

//middleware -> to use json data in our application whether we are accessing json data or
// posting a request in json format we need to add this line

// app.use(express.json());: This line of code adds Express middleware that parses
// incoming request bodies with JSON payloads. It's important to place this before any routes
// that need to handle JSON data in the request body. This middleware is responsible for parsing JSON data from requests,
// and it should be applied at the beginning of your middleware stack to ensure it's available for all subsequent route handlers.

app.use(express.json());
//mount the router  on /api/auth route
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
  });
});
