import express from 'express'
import { joinBot } from '../controller/meetingController.js';
import { authMiddleware } from '../Middlware/middleware.js';

const router = express.Router();

router.route("/").post(authMiddleware, joinBot);

export default router;