export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 via-pink-50 to-yellow-50 text-gray-700 pt-14 pb-8 mt-20 border-t border-pink-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 px-6 text-center sm:text-left">
        {/* Brand Section */}
        <div>
          <h3 className="text-3xl font-extrabold text-blue-700 mb-3">
            SkillSphere 🌐
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Your learning journey starts here.<br /> 
            <span className="text-pink-600 font-semibold">
              Learn. Grow. Succeed.
            </span>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-blue-700 mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/courses"
                className="hover:text-pink-600 transition-all"
              >
                🎓 Courses
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-pink-600 transition-all"
              >
                💡 About Us
              </a>
            </li>
            <li>
              <a
                href="/instructors"
                className="hover:text-pink-600 transition-all"
              >
                👩‍🏫 Instructors
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-pink-600 transition-all"
              >
                📞 Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-xl font-semibold text-blue-700 mb-4">
            Follow Us
          </h4>
          <div className="flex justify-center sm:justify-start space-x-5">
            <a
              href="#"
              className="bg-blue-100 text-blue-700 p-2 rounded-full hover:bg-blue-200 transition"
            >
              <i className="fab fa-twitter text-lg"></i>
            </a>
            <a
              href="#"
              className="bg-pink-100 text-pink-700 p-2 rounded-full hover:bg-pink-200 transition"
            >
              <i className="fab fa-linkedin text-lg"></i>
            </a>
            <a
              href="#"
              className="bg-yellow-100 text-yellow-700 p-2 rounded-full hover:bg-yellow-200 transition"
            >
              <i className="fab fa-youtube text-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-pink-100"></div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()}{" "}
        <span className="text-blue-600 font-semibold">SkillSphere</span>. All
        rights reserved. 💗
      </div>
    </footer>
  );
}
