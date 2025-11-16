import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Certificate() {
  const { courseName } = useParams(); 
  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDate(formattedDate);
  }, []);

  const handleDownload = async () => {
    const element = document.getElementById("certificate");
    const canvas = await html2canvas(element, { scale: 3 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    pdf.addImage(imgData, "PNG", 10, 10, 270, 180);
    pdf.save(`${userName}_${courseName}_certificate.pdf`);
  };

  const handleSetName = () => {
    if (userName.trim() === "") {
      alert("Please enter your full name before generating the certificate.");
      return;
    }
    setIsNameSet(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 p-10">
      {!isNameSet ? (
        // Name Input UI
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">
            🖋️ Enter Your Name
          </h1>
          <p className="text-gray-600 mb-6">
            Please enter the name you'd like to appear on your certificate for
            <span className="font-semibold text-blue-600"> {decodeURIComponent(courseName)}</span>.
          </p>
          <input
            type="text"
            placeholder="e.g., Abhi Narashimha"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center text-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            onClick={handleSetName}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Generate Certificate
          </button>
        </div>
      ) : (
        //  Certificate Display
        <div className="flex flex-col items-center">
          <div
            id="certificate"
            className="relative w-[900px] h-[600px] bg-white border-[10px] border-yellow-400 rounded-xl shadow-2xl flex flex-col items-center justify-center text-center px-10 py-6"
          >
            {/* Background watermark */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://upload.wikimedia.org/wikipedia/commons/6/62/University_icon.png')] bg-center bg-no-repeat bg-contain"></div>

            {/* Top Logo */}
            <div className="absolute top-8 left-8 flex items-center space-x-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
                alt="Logo"
                className="w-12 h-12"
              />
              <h2 className="text-2xl font-extrabold text-blue-700">
                SkillSphere
              </h2>
            </div>

            {/* Certificate Header */}
            <h1 className="text-5xl font-extrabold text-blue-800 mt-10">
              Certificate of Completion
            </h1>
            <p className="text-gray-600 mt-2 text-lg italic">
              This certifies that
            </p>

            {/* User Name */}
            <h2 className="text-4xl font-bold text-pink-600 mt-4 underline decoration-yellow-400 decoration-4">
              {userName}
            </h2>

            <p className="text-gray-700 mt-6 text-lg max-w-2xl">
              has successfully completed the course
            </p>

            {/* Course Name */}
            <h2 className="text-3xl font-semibold text-blue-700 mt-2">
              {decodeURIComponent(courseName)}
            </h2>

            <p className="text-gray-600 mt-4">
              demonstrating commitment, skill, and excellence in learning.
            </p>

            {/* Bottom Section */}
            <div className="absolute bottom-12 w-full flex justify-between px-16 items-center">
              <div className="text-left">
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold text-gray-800">{date}</p>
              </div>

              <div className="text-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Signature.png"
                  alt="Signature"
                  className="w-28 mx-auto"
                />
                <p className="text-gray-700 font-semibold">Instructor</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600">Verified by</p>
                <p className="font-semibold text-blue-700">SkillSphere Academy</p>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
             Download Certificate
          </button>

          <button
            onClick={() => setIsNameSet(false)}
            className="mt-4 text-blue-600 underline hover:text-blue-800"
          >
             Edit Name
          </button>
        </div>
      )}
    </div>
  );
}
