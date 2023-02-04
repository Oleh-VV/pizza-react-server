import express from "express";
import {
  registrValidation,
  loginValidation,
  updateValidation,
} from "../middleware/validation.js";
import { registration, login, update } from "../controllers/UserController.js";

const userRouter = express.Router();
userRouter.post("/registration", registrValidation, registration);
userRouter.post("/login", loginValidation, login);
userRouter.post("/update", updateValidation, update);
userRouter.get("/1", (req, res) => {
  console.log("VSE OKEY");
  res.json({ message: "My name is Oleh" });
});
//userRouter.post("/logout", userController.logout);
//userRouter.get("/activate/:link", userController.activate);
//userRouter.get("/refresh", userController.refresh);
//userRouter.get("/users", authMiddleware, userController.getUsers);

export default userRouter;
