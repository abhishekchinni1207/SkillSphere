export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-yellow-50 px-6 relative overflow-hidden">
      {/* Decorative Confetti Emojis */}
      <div className="absolute text-5xl animate-bounce top-16 left-20 opacity-50">🎉</div>
      <div className="absolute text-6xl animate-pulse top-24 right-24 opacity-50">✨</div>
      <div className="absolute text-4xl animate-bounce bottom-20 left-40 opacity-40">🎊</div>
      <div className="absolute text-5xl animate-pulse bottom-10 right-40 opacity-40">🎈</div>

      {/* Icon Circle */}
      <div className="bg-white p-8 rounded-full shadow-lg border-4 border-green-100 mb-6">
        <span className="text-6xl text-green-500">✅</span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4 drop-shadow-sm text-center">
        Payment Successful! 🎉
      </h1>

      {/* Message */}
      <p className="text-gray-700 text-lg text-center max-w-md mb-8 leading-relaxed">
        Congratulations! Your course has been successfully unlocked.  
        You can now continue your learning journey with SkillSphere 🚀
      </p>

      {/* Button */}
      <a
        href="/my-courses"
        className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300"
      >
        Go to My Courses 🎓
      </a>

      {/* Subtext */}
      <p className="text-gray-400 text-sm mt-10">
        Need help?{" "}
        <a href="/contact" className="text-blue-600 hover:underline">
          Contact Support
        </a>
      </p>
    </div>
  );
}
