import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide student name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide student email"],
      unique: true,
      lowercase: true,
    },
    rollNumber: {
      type: String,
      required: [true, "Please provide roll number"],
      unique: true,
      trim: true,
    },
    class: {
      type: String,
      required: [true, "Please provide class"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
