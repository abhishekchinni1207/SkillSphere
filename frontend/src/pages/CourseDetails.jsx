import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StripeButton from "../components/StripeButton"; // your Stripe payment component

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );

  if (!course)
    return (
      <p className="text-center text-gray-600 mt-20">
        Course not found 😢
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-yellow-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white border border-pink-100 rounded-3xl shadow-lg overflow-hidden">
        {/* Course Thumbnail */}
        <img
          src={
            course.image_url ||
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=60"
          }
          alt={course.title}
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
        />

        {/* Course Info */}
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-3">
            {course.title}
          </h1>
          <p className="text-gray-700 mb-5 text-lg leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <p className="text-gray-700 text-lg">
              👨‍🏫 <span className="font-semibold">{course.instructor}</span>
            </p>
            <p className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-4 py-1 rounded-full shadow-sm mt-3 sm:mt-0">
              ₹{course.price}
            </p>
          </div>

          {/* Purchase Section */}
          {user ? (
            <div className="flex flex-col items-start sm:flex-row sm:items-center sm:space-x-4">
              <StripeButton
                courseId={course.id}
                amount={course.price}
                onSuccess={() => alert("Payment successful! 🎉")}
              />
              <p className="mt-4 sm:mt-0 text-gray-500 text-sm">
                Secure payment powered by Stripe 🔒
              </p>
            </div>
          ) : (
            <div className="bg-pink-100 border border-pink-200 text-pink-700 p-3 rounded-lg text-center font-medium shadow-sm">
              Please log in to purchase this course.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
