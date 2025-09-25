import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "flowbite-react";
import { HiUsers, HiBookOpen, HiChartBar, HiTrendingUp } from "react-icons/hi";

function Home() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalSubjects: 0,
    averageScore: 0,
    topPerformers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const [studentsRes, subjectsRes, avgRes] = await Promise.all([
        axios.get("/api/v1/academic/students"),
        axios.get("/api/v1/academic/subjects"),
        axios.get("/api/v1/academic/students-with-averages"),
      ]);

      const students = studentsRes.data.result || [];
      const subjects = subjectsRes.data.result || [];
      const studentsWithAvg = avgRes.data.result || [];

      const totalAvg =
        studentsWithAvg.length > 0
          ? studentsWithAvg.reduce(
              (sum, student) => sum + (student.averageMarks || 0),
              0
            ) / studentsWithAvg.length
          : 0;

      const topPerformers = studentsWithAvg
        .filter((student) => student.averageMarks > 0)
        .sort((a, b) => b.averageMarks - a.averageMarks)
        .slice(0, 5);

      setStats({
        totalStudents: students.length,
        totalSubjects: subjects.length,
        averageScore: totalAvg,
        topPerformers,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react/prop-types
  const StatCard = ({ icon: Icon, title, value, color, trend }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Icon className={`h-8 w-8 ${color}`} />
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-green-600">
              <HiTrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">{trend}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Educational Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Monitor student performance and academic progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={HiUsers}
            title="Total Students"
            value={stats.totalStudents}
            color="text-blue-600"
            trend="+12% from last month"
          />
          <StatCard
            icon={HiBookOpen}
            title="Active Subjects"
            value={stats.totalSubjects}
            color="text-green-600"
            trend="+3 new subjects"
          />
          <StatCard
            icon={HiChartBar}
            title="Average Score"
            value={`${stats.averageScore.toFixed(1)}%`}
            color="text-purple-600"
            trend="+5.2% improvement"
          />
        </div>

        {/* Top Performers */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <HiTrendingUp className="h-6 w-6 text-gold-500 mr-2" />
            Top Performers
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Rank</th>
                  <th className="px-6 py-3">Student Name</th>
                  <th className="px-6 py-3">Roll Number</th>
                  <th className="px-6 py-3">Class</th>
                  <th className="px-6 py-3">Average Score</th>
                </tr>
              </thead>
              <tbody>
                {stats.topPerformers.map((student, index) => (
                  <tr
                    key={student._id}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                              ? "bg-gray-400"
                              : index === 2
                              ? "bg-yellow-600"
                              : "bg-blue-500"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {student.rollNumber}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{student.class}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.averageMarks >= 90
                            ? "bg-green-100 text-green-800"
                            : student.averageMarks >= 80
                            ? "bg-blue-100 text-blue-800"
                            : student.averageMarks >= 70
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.averageMarks.toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {stats.topPerformers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No student performance data available yet.
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => (window.location.href = "/students")}
              className="p-6 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex flex-col items-center space-y-2"
            >
              <HiUsers className="h-8 w-8" />
              <span className="font-semibold">Manage Students</span>
            </button>
            <button
              onClick={() => (window.location.href = "/students")}
              className="p-6 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 flex flex-col items-center space-y-2"
            >
              <HiBookOpen className="h-8 w-8" />
              <span className="font-semibold">Add Subjects</span>
            </button>
            <button
              onClick={() => (window.location.href = "/students")}
              className="p-6 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 flex flex-col items-center space-y-2"
            >
              <HiChartBar className="h-8 w-8" />
              <span className="font-semibold">Record Marks</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Home;
