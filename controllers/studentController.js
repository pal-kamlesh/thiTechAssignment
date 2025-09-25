import Student from "../model/Student.js";
import Subject from "../model/Subject.js";
import Marks from "../model/Marks.js";
import { errorHandler } from "../utils/error.js";

// Student Controllers
const createStudent = async (req, res, next) => {
  try {
    const { name, email, rollNumber, class: studentClass } = req.body;

    if (!name || !email || !rollNumber || !studentClass) {
      return next(errorHandler(400, "All fields are required"));
    }

    const existingStudent = await Student.findOne({
      $or: [{ email }, { rollNumber }],
    });

    if (existingStudent) {
      return res.status(409).json({
        message: "Student with this email or roll number already exists",
      });
    }

    const newStudent = await Student.create({
      name,
      email,
      rollNumber,
      class: studentClass,
    });

    res.status(201).json({
      message: "Student created successfully",
      result: newStudent,
    });
  } catch (error) {
    next(error);
  }
};

const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json({ result: students });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      return next(errorHandler(404, "Student not found"));
    }

    res.status(200).json({ result: student });
  } catch (error) {
    next(error);
  }
};

// Subject Controllers
const createSubject = async (req, res, next) => {
  try {
    const { name, code, maxMarks } = req.body;

    if (!name || !code) {
      return next(errorHandler(400, "Name and code are required"));
    }

    const existingSubject = await Subject.findOne({
      $or: [{ name }, { code }],
    });

    if (existingSubject) {
      return res.status(409).json({
        message: "Subject with this name or code already exists",
      });
    }

    const newSubject = await Subject.create({
      name,
      code,
      maxMarks: maxMarks || 100,
    });

    res.status(201).json({
      message: "Subject created successfully",
      result: newSubject,
    });
  } catch (error) {
    next(error);
  }
};

const getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.status(200).json({ result: subjects });
  } catch (error) {
    next(error);
  }
};

// Marks Controllers
const addMarks = async (req, res, next) => {
  try {
    const { studentId, subjectId, marks, examType } = req.body;

    if (!studentId || !subjectId || marks === undefined) {
      return next(
        errorHandler(400, "Student, subject, and marks are required")
      );
    }

    const student = await Student.findById(studentId);
    const subject = await Subject.findById(subjectId);

    if (!student) {
      return next(errorHandler(404, "Student not found"));
    }

    if (!subject) {
      return next(errorHandler(404, "Subject not found"));
    }

    if (marks > subject.maxMarks) {
      return next(errorHandler(400, `Marks cannot exceed ${subject.maxMarks}`));
    }

    const existingMarks = await Marks.findOne({
      student: studentId,
      subject: subjectId,
      examType: examType || "final",
    });

    if (existingMarks) {
      existingMarks.marks = marks;
      await existingMarks.save();
      await existingMarks.populate(["student", "subject"]);

      return res.status(200).json({
        message: "Marks updated successfully",
        result: existingMarks,
      });
    }

    const newMarks = await Marks.create({
      student: studentId,
      subject: subjectId,
      marks,
      examType: examType || "final",
    });

    await newMarks.populate(["student", "subject"]);

    res.status(201).json({
      message: "Marks added successfully",
      result: newMarks,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentMarks = async (req, res, next) => {
  try {
    const { studentId } = req.params;

    const marks = await Marks.find({ student: studentId })
      .populate("student")
      .populate("subject")
      .sort({ createdAt: -1 });

    // Calculate average
    const totalMarks = marks.reduce((sum, mark) => sum + mark.marks, 0);
    const average =
      marks.length > 0 ? (totalMarks / marks.length).toFixed(2) : 0;

    res.status(200).json({
      result: marks,
      average: parseFloat(average),
      totalSubjects: marks.length,
    });
  } catch (error) {
    next(error);
  }
};

const getAllMarks = async (req, res, next) => {
  try {
    const marks = await Marks.find()
      .populate("student")
      .populate("subject")
      .sort({ createdAt: -1 });

    res.status(200).json({ result: marks });
  } catch (error) {
    next(error);
  }
};

const getStudentsWithAverages = async (req, res, next) => {
  try {
    const studentsWithMarks = await Student.aggregate([
      {
        $lookup: {
          from: "marks",
          localField: "_id",
          foreignField: "student",
          as: "marks",
        },
      },
      {
        $addFields: {
          averageMarks: {
            $cond: {
              if: { $gt: [{ $size: "$marks" }, 0] },
              then: { $avg: "$marks.marks" },
              else: 0,
            },
          },
          totalSubjects: { $size: "$marks" },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    res.status(200).json({ result: studentsWithMarks });
  } catch (error) {
    next(error);
  }
};

export {
  createStudent,
  getAllStudents,
  getStudentById,
  createSubject,
  getAllSubjects,
  addMarks,
  getStudentMarks,
  getAllMarks,
  getStudentsWithAverages,
};
