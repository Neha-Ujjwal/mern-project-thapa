const express = require("express");
const router = express.Router();
const contactForm = require("../controllers/contact-controller.js");
const contactSchema = require("../validators/contact-validator.js");
const validate = require("../middlewares/validate-middleware.js");

router.post("/contact", validate(contactSchema), contactForm);

module.exports = router;
