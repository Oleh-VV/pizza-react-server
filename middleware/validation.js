import { body } from "express-validator";
export const registrValidation = [
  body("email", "Incorrect email").isEmail(),
  body("password", "Incorrect password").isLength({ min: 6 }),
  body("surname", "Incorrect surname").isLength({ min: 1 }),
  body("name", "Incorrect name").isLength({ min: 1 }),
  body("phone", "Incorrect phone").isLength({ min: 10 }),
  body("adress", "Incorrect adress").isLength({ min: 1 }),
];
export const loginValidation = [
  body("email", "Incorrect email").isEmail(),
  body("password", "Incorrect password").isLength({ min: 6 }),
];
export const updateValidation = [
  body("email", "Incorrect email").isEmail(),
  body("surname", "Incorrect surname").isLength({ min: 1 }),
  body("name", "Incorrect name").isLength({ min: 1 }),
  body("phone", "Incorrect phone").isLength({ min: 10 }),
  body("adress", "Incorrect adress").isLength({ min: 1 }),
];
