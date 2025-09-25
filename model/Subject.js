import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide subject name"],
      trim: true,
      unique: true,
    },
    code: {
      type: String,
      required: [true, "Please provide subject code"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    maxMarks: {
      type: Number,
      required: [true, "Please provide maximum marks"],
      min: [1, "Maximum marks must be at least 1"],
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("Subject", subjectSchema);
export default Subject;
