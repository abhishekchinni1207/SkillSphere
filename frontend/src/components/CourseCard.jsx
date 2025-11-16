import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="group block bg-gradient-to-br from-white via-yellow-50 to-pink-50 border border-pink-100 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={
            course.image ||
            "https://images.unsplash.com/photo-1581092334507-bf3dd5d51f9b?auto=format&fit=crop&w=800&q=60"
          }
          alt={course.title}
          className="h-48 w-full object-cover group-hover:opacity-90 transition"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
          ₹{course.price || 0}
        </div>
      </div>

      {/* Course Info */}
      <div className="p-5 text-center">
        <h3 className="text-xl font-bold text-blue-700 mb-2 group-hover:text-pink-600">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {course.description}
        </p>
        <p className="text-sm text-gray-500 mb-4">👨‍🏫 {course.instructor}</p>

        {/* Enroll Button */}
        <div className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          Enroll Now →
        </div>
      </div>
    </Link>
  );
}
