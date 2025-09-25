import { Router } from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  createSubject,
  getAllSubjects,
  addMarks,
  getStudentMarks,
  getAllMarks,
  getStudentsWithAverages,
} from "../controllers/studentController.js";
import { verifyToken, ifAdmin } from "../middleware/verifyUser.js";

const router = Router();

// Student routes
router.post("/students", verifyToken, createStudent);
router.get("/students", verifyToken, getAllStudents);
router.get("/students/:id", verifyToken, getStudentById);
router.get("/students-with-averages", verifyToken, getStudentsWithAverages);

// Subject routes
router.post("/subjects", verifyToken, createSubject);
router.get("/subjects", verifyToken, getAllSubjects);

// Marks routes
router.post("/marks", verifyToken, addMarks);
router.get("/marks", verifyToken, getAllMarks);
router.get("/marks/student/:studentId", verifyToken, getStudentMarks);

export default router;
