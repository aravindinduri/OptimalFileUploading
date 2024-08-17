import { Router } from "express";
import {
   
} from "../controllers/filecontroller"

const router = Router();

router.route("/upload").post();
router.route("/retrive").get();

export default router