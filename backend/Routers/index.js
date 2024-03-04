import express from 'express';
import UserRouter from './user.js';
import AccountRouter from './account.js';
const router = express.Router();

router.use("/user",UserRouter)
router.use('/account',AccountRouter);
export default router;