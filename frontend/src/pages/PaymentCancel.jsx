export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-yellow-50 px-6">
      {/* Icon */}
      <div className="bg-white p-8 rounded-full shadow-lg border-4 border-pink-100 mb-6">
        <span className="text-6xl text-pink-500">❌</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-blue-700 mb-4 drop-shadow-sm">
        Payment Cancelled
      </h1>

      {/* Message */}
      <p className="text-gray-700 text-lg text-center max-w-md mb-8 leading-relaxed">
        Oops! It looks like your payment didn’t go through.  
        Don’t worry — you can try again anytime to continue learning with us.
      </p>

      {/* Back to Courses Button */}
      <a
        href="/courses"
        className="bg-gradient-to-r from-blue-600 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-pink-500 hover:to-blue-600 transition-all duration-300"
      >
        Back to Courses 🎓
      </a>

      {/* Subtle Footer */}
      <p className="text-gray-400 text-sm mt-10">
        Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact Support</a>
      </p>
    </div>
  );
}
