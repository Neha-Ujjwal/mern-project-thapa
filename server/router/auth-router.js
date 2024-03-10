const express = require("express");

const router = express.Router();
const singupSchema = require("../validators/auth-validator");
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
router.post("/register", validate(singupSchema), authControllers.register);
router.post("/login", authControllers.login);

module.exports = router;
