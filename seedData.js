import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Import your models
import User from "./model/User.js";
import Student from "./model/Student.js";
import Subject from "./model/Subject.js";
import Marks from "./model/Marks.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Student.deleteMany({});
    await Subject.deleteMany({});
    await Marks.deleteMany({});

    console.log("Cleared existing data");

    // Create admin user
    const adminUser = await User.create({
      username: "admin",
      email: "admin@school.com",
      password: "admin123",
      role: "admin",
    });

    // Create regular users
    const users = await User.create([
      {
        username: "teacher1",
        email: "teacher1@school.com",
        password: "teacher123",
        role: "user",
      },
      {
        username: "teacher2",
        email: "teacher2@school.com",
        password: "teacher123",
        role: "user",
      },
    ]);

    console.log("Users created");

    // Create subjects
    const subjects = await Subject.create([
      { name: "Mathematics", code: "MATH101", maxMarks: 100 },
      { name: "Physics", code: "PHY101", maxMarks: 100 },
      { name: "Chemistry", code: "CHEM101", maxMarks: 100 },
      { name: "Biology", code: "BIO101", maxMarks: 100 },
      { name: "English", code: "ENG101", maxMarks: 100 },
      { name: "History", code: "HIST101", maxMarks: 100 },
      { name: "Geography", code: "GEO101", maxMarks: 100 },
      { name: "Computer Science", code: "CS101", maxMarks: 100 },
    ]);

    console.log("Subjects created");

    // Create students
    const students = await Student.create([
      {
        name: "Alice Johnson",
        email: "alice.johnson@student.com",
        rollNumber: "STU001",
        class: "10th Grade",
      },
      {
        name: "Bob Smith",
        email: "bob.smith@student.com",
        rollNumber: "STU002",
        class: "10th Grade",
      },
      {
        name: "Charlie Brown",
        email: "charlie.brown@student.com",
        rollNumber: "STU003",
        class: "10th Grade",
      },
      {
        name: "Diana Prince",
        email: "diana.prince@student.com",
        rollNumber: "STU004",
        class: "11th Grade",
      },
      {
        name: "Edward Norton",
        email: "edward.norton@student.com",
        rollNumber: "STU005",
        class: "11th Grade",
      },
      {
        name: "Fiona Apple",
        email: "fiona.apple@student.com",
        rollNumber: "STU006",
        class: "11th Grade",
      },
      {
        name: "George Lucas",
        email: "george.lucas@student.com",
        rollNumber: "STU007",
        class: "12th Grade",
      },
      {
        name: "Hannah Montana",
        email: "hannah.montana@student.com",
        rollNumber: "STU008",
        class: "12th Grade",
      },
      {
        name: "Ian McKellen",
        email: "ian.mckellen@student.com",
        rollNumber: "STU009",
        class: "12th Grade",
      },
      {
        name: "Julia Roberts",
        email: "julia.roberts@student.com",
        rollNumber: "STU010",
        class: "9th Grade",
      },
      {
        name: "Kevin Hart",
        email: "kevin.hart@student.com",
        rollNumber: "STU011",
        class: "9th Grade",
      },
      {
        name: "Luna Lovegood",
        email: "luna.lovegood@student.com",
        rollNumber: "STU012",
        class: "9th Grade",
      },
    ]);

    console.log("Students created");

    // Create marks data
    const marksData = [];

    // Generate realistic marks for each student
    for (const student of students) {
      // Each student will have marks in 5-7 random subjects
      const studentSubjects = subjects
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 5);

      for (const subject of studentSubjects) {
        // Generate marks based on student performance level
        let basePerformance;
        const studentIndex = students.indexOf(student);

        // Create different performance levels for variety
        if (studentIndex < 3) {
          basePerformance = 85; // High performers
        } else if (studentIndex < 7) {
          basePerformance = 75; // Average performers
        } else {
          basePerformance = 65; // Lower performers
        }

        // Add some randomness (-10 to +10)
        const marks = Math.min(
          100,
          Math.max(30, basePerformance + Math.floor(Math.random() * 21) - 10)
        );

        marksData.push({
          student: student._id,
          subject: subject._id,
          marks: marks,
          examType: "final",
        });

        // Add some midterm marks for variety (60% of students)
        if (Math.random() > 0.4) {
          const midtermMarks = Math.min(
            100,
            Math.max(25, marks + Math.floor(Math.random() * 21) - 10)
          );
          marksData.push({
            student: student._id,
            subject: subject._id,
            marks: midtermMarks,
            examType: "midterm",
          });
        }
      }
    }

    const marks = await Marks.create(marksData);
    console.log("Marks created");

    console.log("✅ Seed data created successfully!");
    console.log(`Created ${users.length + 1} users (including admin)`);
    console.log(`Created ${students.length} students`);
    console.log(`Created ${subjects.length} subjects`);
    console.log(`Created ${marks.length} marks records`);

    console.log("\n📚 Login Credentials:");
    console.log("Admin: admin@school.com / admin123");
    console.log("Teacher: teacher1@school.com / teacher123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
