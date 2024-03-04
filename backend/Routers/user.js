import express from "express";
import { validateDataOnRegister, validateUserDataUpdate } from "../utils/validateDate.js";
import { register, UpdateDetails,FilterData } from "../Controller/user.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/signin", validateDataOnRegister, register);
router.put("/", validateUserDataUpdate, UpdateDetails);
router.get('/bulk',isAuth,FilterData);
export default router;