import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/courses`);
        setCourses(res.data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-3 drop-shadow-sm">
            🌟 Explore Our Courses
          </h1>
          <p className="text-gray-700 text-lg">
            Learn from top instructors and upgrade your skills with passion.
          </p>
        </div>

        {/* Course Grid */}
        {courses.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No courses available yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="group bg-white border border-pink-100 rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300"
              >
                {/* Course Thumbnail */}
                <div className="relative">
                  <img
                    src={
                      course.image_url ||
                      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=60"
                    }
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    ₹{course.price || 0}
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-5">
                  <h2 className="text-lg font-bold text-blue-700 mb-1 group-hover:text-pink-600 transition-all">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {course.description}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-600 font-medium">
                      👨‍🏫 {course.instructor}
                    </p>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold px-3 py-1.5 rounded-lg shadow-md hover:from-pink-500 hover:to-pink-600 transition-all duration-300">
                      View →
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
