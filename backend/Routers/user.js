import  express  from "express";
import { validateDataOnRegister } from "../utils/validateDate.js";
import register from "../Controller/user.js";
const router = express.Router();

router.post("/signin",validateDataOnRegister,register);

export default router;