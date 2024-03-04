import express from 'express';
import { isAuth } from '../middleware/isAuth';
import { CreateTrans } from '../Controller/account';

const router = express.Router();

router.get('/balance',isAuth,AddBalance);
router.post('/transfer',isAuth,CreateTrans);

export default router;