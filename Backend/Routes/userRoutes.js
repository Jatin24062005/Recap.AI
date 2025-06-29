import express from 'express';
import { login, signup } from '../auth/Authentication.js';

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);   

export default router;