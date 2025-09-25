import { Router } from "express";
import userRoute from "./user.routes.js";
import studentRoute from "./student.Routes.js";

const router = Router();

router.use("/user", userRoute);
router.use("/academic", studentRoute);

export default router;
