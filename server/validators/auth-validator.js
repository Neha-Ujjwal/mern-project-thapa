const { z } = require("zod");

//creating an object schema

const signupSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .trim()
    .min(3, { message: "Username must be atleast 3 characters" })
    .max(255, { message: "Username must not be more than 255 characters" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be atleast 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  phone: z
    .string({
      required_error: "Phone is required",
    })
    .trim()
    .min(10, { message: "Phone must be atleast 10 digits" })
    .max(20, { message: "Phone must not be more than 20 digits" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(3, { message: "Password must be atleast 3 characters" })
    .max(1024, { message: "Password must not be more than 1024 characters" }),
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be atleast 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(3, { message: "Password must be atleast 3 characters" })
    .max(1024, { message: "Password must not be more than 1024 characters" }),
});
module.exports = { signupSchema, loginSchema };
