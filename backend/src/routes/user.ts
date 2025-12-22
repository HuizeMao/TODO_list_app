import express from "express";
import * as userController from "src/controllers/user";
import * as userValidator from "src/validators/user";

const router = express.Router();

router.post("/", userValidator.createUser, userController.createUser);
router.get("/:id", userController.getUser);
export default router;
