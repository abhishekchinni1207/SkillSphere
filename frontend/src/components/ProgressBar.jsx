export default function ProgressBar({ value }) {
  return (
    <div className="w-full bg-gradient-to-r from-pink-100 via-yellow-100 to-blue-100 rounded-full h-4 overflow-hidden shadow-inner">
      <div
        className="h-4 rounded-full bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-400 transition-all duration-700 ease-in-out shadow-md"
        style={{ width: `${value}%` }}
      ></div>

      
      <div className="text-center mt-1 text-sm font-medium text-blue-700">
        {value}% Complete
      </div>
    </div>
  );
}
