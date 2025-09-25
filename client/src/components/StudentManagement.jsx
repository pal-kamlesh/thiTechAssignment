import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [studentsWithAverages, setStudentsWithAverages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [studentForm, setStudentForm] = useState({
    name: "",
    email: "",
    rollNumber: "",
    class: "",
  });

  const [subjectForm, setSubjectForm] = useState({
    name: "",
    code: "",
    maxMarks: 100,
  });

  const [marksForm, setMarksForm] = useState({
    studentId: "",
    subjectId: "",
    marks: "",
    examType: "final",
  });

  const [activeTab, setActiveTab] = useState("students");

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
    fetchStudentsWithAverages();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/v1/academic/students");
      setStudents(response.data.result);
    } catch (error) {
      toast.error("Failed to fetch students");
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("/api/v1/academic/subjects");
      setSubjects(response.data.result);
    } catch (error) {
      toast.error("Failed to fetch subjects");
    }
  };

  const fetchStudentsWithAverages = async () => {
    try {
      const response = await axios.get(
        "/api/v1/academic/students-with-averages"
      );
      setStudentsWithAverages(response.data.result);
    } catch (error) {
      toast.error("Failed to fetch student averages");
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/v1/academic/students", studentForm);
      toast.success("Student added successfully");
      setStudentForm({ name: "", email: "", rollNumber: "", class: "" });
      fetchStudents();
      fetchStudentsWithAverages();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add student");
    }
    setLoading(false);
  };

  const handleSubjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/v1/academic/subjects", subjectForm);
      toast.success("Subject added successfully");
      setSubjectForm({ name: "", code: "", maxMarks: 100 });
      fetchSubjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add subject");
    }
    setLoading(false);
  };

  const handleMarksSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/v1/academic/marks", marksForm);
      toast.success("Marks added successfully");
      setMarksForm({
        studentId: "",
        subjectId: "",
        marks: "",
        examType: "final",
      });
      fetchStudentsWithAverages();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add marks");
    }
    setLoading(false);
  };

  const TabButton = ({ tab, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(tab)}
      className={`px-4 py-2 font-medium rounded-lg transition-colors ${
        isActive
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Student Management System
      </h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8 space-x-2">
        <TabButton
          tab="students"
          label="Add Student"
          isActive={activeTab === "students"}
          onClick={setActiveTab}
        />
        <TabButton
          tab="subjects"
          label="Add Subject"
          isActive={activeTab === "subjects"}
          onClick={setActiveTab}
        />
        <TabButton
          tab="marks"
          label="Add Marks"
          isActive={activeTab === "marks"}
          onClick={setActiveTab}
        />
        <TabButton
          tab="view"
          label="View Results"
          isActive={activeTab === "view"}
          onClick={setActiveTab}
        />
      </div>

      {/* Add Student Tab */}
      {activeTab === "students" && (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
          <form onSubmit={handleStudentSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={studentForm.name}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={studentForm.email}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Roll Number
              </label>
              <input
                type="text"
                value={studentForm.rollNumber}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, rollNumber: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class
              </label>
              <input
                type="text"
                value={studentForm.class}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, class: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Adding..." : "Add Student"}
            </button>
          </form>
        </div>
      )}

      {/* Add Subject Tab */}
      {activeTab === "subjects" && (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Subject</h2>
          <form onSubmit={handleSubjectSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject Name
              </label>
              <input
                type="text"
                value={subjectForm.name}
                onChange={(e) =>
                  setSubjectForm({ ...subjectForm, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject Code
              </label>
              <input
                type="text"
                value={subjectForm.code}
                onChange={(e) =>
                  setSubjectForm({ ...subjectForm, code: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Marks
              </label>
              <input
                type="number"
                min="1"
                value={subjectForm.maxMarks}
                onChange={(e) =>
                  setSubjectForm({
                    ...subjectForm,
                    maxMarks: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Adding..." : "Add Subject"}
            </button>
          </form>
        </div>
      )}

      {/* Add Marks Tab */}
      {activeTab === "marks" && (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Add Marks</h2>
          <form onSubmit={handleMarksSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Student
              </label>
              <select
                value={marksForm.studentId}
                onChange={(e) =>
                  setMarksForm({ ...marksForm, studentId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name} ({student.rollNumber})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Subject
              </label>
              <select
                value={marksForm.subjectId}
                onChange={(e) =>
                  setMarksForm({ ...marksForm, subjectId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name} ({subject.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marks
              </label>
              <input
                type="number"
                min="0"
                value={marksForm.marks}
                onChange={(e) =>
                  setMarksForm({
                    ...marksForm,
                    marks: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exam Type
              </label>
              <select
                value={marksForm.examType}
                onChange={(e) =>
                  setMarksForm({ ...marksForm, examType: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="final">Final</option>
                <option value="midterm">Midterm</option>
                <option value="quiz">Quiz</option>
                <option value="assignment">Assignment</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 disabled:opacity-50 transition-colors"
            >
              {loading ? "Adding..." : "Add Marks"}
            </button>
          </form>
        </div>
      )}

      {/* View Results Tab */}
      {activeTab === "view" && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Student Results
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subjects
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Average Marks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentsWithAverages.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.rollNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.class}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.totalSubjects}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.averageMarks >= 80
                            ? "bg-green-100 text-green-800"
                            : student.averageMarks >= 60
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.averageMarks > 0
                          ? student.averageMarks.toFixed(2)
                          : "N/A"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {studentsWithAverages.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No students found. Add some students first.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
