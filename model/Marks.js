import mongoose, { Schema } from "mongoose";

const marksSchema = new mongoose.Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    marks: {
      type: Number,
      required: [true, "Please provide marks"],
      min: [0, "Marks cannot be negative"],
    },
    examType: {
      type: String,
      enum: ["midterm", "final", "quiz", "assignment"],
      default: "final",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique combination of student, subject, and examType
marksSchema.index({ student: 1, subject: 1, examType: 1 }, { unique: true });

const Marks = mongoose.model("Marks", marksSchema);
export default Marks;
