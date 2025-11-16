import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import confetti from "canvas-confetti";

export default function CoursePlayer() {
  const { id } = useParams(); // course_id
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const [courseRes, lessonsRes, progressRes] = await Promise.all([
          axios.get(`http://localhost:5000/courses/${id}`),
          axios.get(`http://localhost:5000/lessons/${id}`),
          axios.get(`http://localhost:5000/progress/${user.id}/${id}`),
        ]);

        setCourse(courseRes.data);
        setLessons(lessonsRes.data || []);
        setProgress(progressRes.data?.completed_percent || 0);
      } catch (err) {
        console.error("Error fetching course data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id, user.id]);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const handleNextLesson = async () => {
    const nextIndex = currentLessonIndex + 1;
    const totalLessons = lessons.length;
    const newProgress = Math.min(((nextIndex + 1) / totalLessons) * 100, 100);

    try {
      await axios.post("http://localhost:5000/progress/update", {
        userId: user.id,
        courseId: id,
        percent: newProgress,
      });
      setProgress(newProgress);
      console.log("✅ Progress updated:", newProgress);
    } catch (err) {
      console.error("❌ Progress update failed:", err);
    }

    if (nextIndex < totalLessons) {
      setCurrentLessonIndex(nextIndex);
    } else {
      await handleCourseCompletion();
    }
  };

  const handleCourseCompletion = async () => {
    setIsFinishing(true);
    triggerConfetti();

    try {
      // Update final progress
      await axios.post("http://localhost:5000/progress/update", {
        userId: user.id,
        courseId: id,
        percent: 100,
      });

      // Generate certificate URL (with user name)
      const certUrl = `${window.location.origin}/certificate/${encodeURIComponent(
        `${course.title} - ${user.user_metadata?.name || user.email}`
      )}`;

      // Issue certificate in backend
      await axios.post("http://localhost:5000/certificate/issue", {
        userId: user.id,
        courseId: id,
        certificateUrl: certUrl,
      });

      console.log("🎓 Certificate issued for:", user.user_metadata?.name);
    } catch (err) {
      console.error("Certificate issue failed:", err);
      alert("Error issuing certificate. Check console for details.");
    } finally {
      setIsFinishing(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );

  if (!course)
    return <p className="text-center mt-10 text-gray-500">Course not found.</p>;

  const currentLesson = lessons[currentLessonIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col items-center p-10">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">{course.title}</h1>
        <p className="text-gray-600 mb-6">{course.description}</p>

        {/* Video Player */}
        {currentLesson ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              🎬 {currentLesson.title}
            </h2>
            <iframe
              key={currentLesson.id}
              className="w-full h-96 rounded-lg mb-6"
              src={currentLesson.video_url}
              title={currentLesson.title}
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p className="text-gray-500 text-center mb-6">
            No lessons found for this course.
          </p>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {progress.toFixed(0)}% completed
        </p>

        {/* Buttons Section */}
        <div className="flex justify-between items-center mt-6">
          {/* Next or Finish Button */}
          <button
            onClick={handleNextLesson}
            disabled={isFinishing}
            className={`${
              isFinishing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white px-6 py-2 rounded-md transition`}
          >
            {isFinishing
              ? "Finishing Course 🎓..."
              : currentLessonIndex < lessons.length - 1
              ? "Next Lesson →"
              : "Finish Course 🎓"}
          </button>

          {/* Take Quiz Button (Appears when course 100% complete) */}
          {progress >= 100 && (
            <button
              onClick={() => navigate(`/quiz/${id}`)}
              className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Take Quiz 🧠
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
