const express = require("express");

const router = express.Router();
const { signupSchema, loginSchema } = require("../validators/auth-validator");

const authControllers = require("../controllers/auth-controller.js");
const validate = require("../middlewares/validate-middleware.js");

// router.get("/", (req, res) => {
//   res.status(200).send("welcome to the page using router");
// });

// router.route("/").get((req, res) => {
//   res.status(200).send("welcome to the page using router");
// });

// router.route("/").get(authControllers.home);
// router.route("/register").post(authControllers.register);

router.get("/", authControllers.home);
router.post("/register", validate(signupSchema), authControllers.register);
router.post("/login", validate(loginSchema), authControllers.login);

module.exports = router;
