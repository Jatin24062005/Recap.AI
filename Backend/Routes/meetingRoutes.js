import express from 'express'
import { joinBot } from '../controller/meetingController.js';

const router = express.Router();

router.route("/").post(joinBot);

export default router;