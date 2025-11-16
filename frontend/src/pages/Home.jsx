import CourseCard from "../components/CourseCard";

export default function Home() {
  const courses = [
    {
      id: 1,
      title: "Mastering Web Development",
      description:
        "Learn HTML, CSS, JS, React & more to become a full-stack developer.",
      instructor: "Jane Doe",
      image:
        "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      description:
        "Understand design thinking, wireframing, and user testing.",
      instructor: "John Smith",
      image:
        "https://images.unsplash.com/photo-1587614382346-ac7e28f06b9e?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      title: "Data Science with Python",
      description:
        "Hands-on projects using Pandas, NumPy, and machine learning models.",
      instructor: "Sarah Lee",
      image:
        "https://images.unsplash.com/photo-1581091012184-5c4a7d3f8d3a?auto=format&fit=crop&w=800&q=60",
    },
  ];

  return (
    <main>
      {/* 🌟 Hero Section */}
      <section className="bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-100 text-blue-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-blue-800 drop-shadow-sm">
            Learn. Create. Succeed. 💡 <br /> With <span className="text-pink-600">SkillSphere</span>
          </h1>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            Explore expert-led courses designed to help you master new skills
            and reach your career goals.
          </p>
          <a
            href="/courses"
            className="bg-gradient-to-r from-blue-600 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-pink-500 hover:to-blue-600 transition-all duration-300"
          >
            Explore Courses 🚀
          </a>
        </div>
      </section>

      {/* 📘 Popular Courses */}
      <section className="py-20 bg-gradient-to-br from-white via-yellow-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-12">
            🌟 Popular Courses
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* 👨‍🏫 Instructor Section */}
      <section className="py-20 bg-white border-t border-pink-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-12 text-blue-700">
            Learn from World-Class Instructors ✨
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Dr. Maria Gomez",
                img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=60",
                title: "AI & Machine Learning Expert",
              },
              {
                name: "Ethan Clark",
                img: "https://images.unsplash.com/photo-1603415526960-f7e0328b9a9d?auto=format&fit=crop&w=800&q=60",
                title: "Full Stack Developer",
              },
              {
                name: "Lisa Tran",
                img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=60",
                title: "UX/UI Designer",
              },
            ].map((instructor, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-pink-50 to-yellow-50 border border-pink-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={instructor.img}
                  alt={instructor.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white shadow-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-blue-700">{instructor.name}</h3>
                <p className="text-gray-600">{instructor.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💬 Testimonials */}
      <section className="bg-gradient-to-br from-blue-600 to-pink-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold mb-12 drop-shadow-sm">
            ❤️ What Our Learners Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "SkillSphere helped me land my first web development job! The instructors were amazing.",
                name: "Rahul Sharma",
              },
              {
                quote:
                  "I loved the interactive UI/UX course! The lessons were easy to follow and engaging.",
                name: "Priya Verma",
              },
              {
                quote:
                  "The data science projects gave me real-world experience. Highly recommend this platform!",
                name: "Ankit Kumar",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white text-gray-800 rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <p className="italic mb-4 text-gray-700 leading-relaxed">
                  “{t.quote}”
                </p>
                <h4 className="font-bold text-pink-600">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
