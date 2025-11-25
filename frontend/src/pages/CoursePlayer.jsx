import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import confetti from "canvas-confetti";

export default function CoursePlayer() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, lessonRes, progressRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/courses/${id}`),
          axios.get(`${API_BASE_URL}/lessons/${id}`),
          axios.get(`${API_BASE_URL}/progress/${user.id}/${id}`),
        ]);

        setCourse(courseRes.data);
        setLessons(lessonRes.data);
        setProgress(progressRes.data?.completed_percent || 0);
      } catch (err) {
        console.error("Error loading course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user.id]);

  // ------------------ CONFETTI ------------------
  const triggerConfetti = () => {
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } });

      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  // ------------------ NEXT LESSON ------------------
  const handleNextLesson = async () => {
    const nextIndex = currentLessonIndex + 1;
    const total = lessons.length;

    const newPercent = Math.min(((nextIndex + 1) / total) * 100, 100);

    try {
      await axios.post(`${API_BASE_URL}/progress/update`, {
        userId: user.id,
        courseId: id,
        percent: newPercent,
      });

      setProgress(newPercent);
    } catch (err) {
      console.error("Progress update failed:", err);
    }

    if (nextIndex < total) {
      setCurrentLessonIndex(nextIndex);
    } else {
      handleCourseCompletion();
    }
  };

  // ------------------ FINISH COURSE ------------------
  const handleCourseCompletion = async () => {
    setIsFinishing(true);
    triggerConfetti();

    try {
      await axios.post(`${API_BASE_URL}/progress/update`, {
        userId: user.id,
        courseId: id,
        percent: 100,
      });

      const certUrl = `${window.location.origin}/certificate/${id}`;

      await axios.post(`${API_BASE_URL}/certificate/issue`, {
        userId: user.id,
        courseId: id,
        certificateUrl: certUrl,
      });

      // ⭐ REDIRECT USER TO CERTIFICATE PAGE  
      setTimeout(() => {
        navigate(`/certificate/${id}`);
      }, 2000);

    } catch (err) {
      console.error("Certificate creation error:", err);
      alert("Error issuing certificate");
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

  if (!course) return <p>Course not found.</p>;

  const currentLesson = lessons[currentLessonIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col items-center p-10">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-bold text-blue-700">{course.title}</h1>
        <p className="text-gray-600 mb-6">{course.description}</p>

        {currentLesson ? (
          <>
            <h2 className="text-xl font-semibold mb-3">
              🎬 {currentLesson.title}
            </h2>

            <iframe
              key={currentLesson.id}
              className="w-full h-96 rounded-lg mb-6"
              src={currentLesson.video_url}
              title={currentLesson.title}
              allowFullScreen
            ></iframe>
          </>
        ) : (
          <p>No lessons found.</p>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleNextLesson}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            {currentLessonIndex < lessons.length - 1
              ? "Next Lesson →"
              : "Finish Course 🎓"}
          </button>

          {progress >= 100 && (
            <button
              onClick={() => navigate(`/quiz/${id}`)}
              className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600"
            >
              Take Quiz 🧠
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
