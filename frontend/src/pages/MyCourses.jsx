import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/my-courses/${user.id}`);
        setCourses(res.data || []);
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">
          🎓 My Courses
        </h1>

        {courses.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20">
            You haven’t enrolled in any courses yet. <br />
            <Link to="/courses" className="text-blue-600 hover:underline">
              Browse Courses
            </Link>
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={
                    course.image_url ||
                    "https://placeholder.co/400x250?text=Course+Image"
                  }
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <Link
                    to={`/course/${course.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Continue Learning →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
