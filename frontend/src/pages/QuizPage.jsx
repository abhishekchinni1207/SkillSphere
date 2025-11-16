import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/quiz/${id}`).then((res) => {
      setQuestions(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/quiz/submit", {
      answers: Object.values(answers),
      courseId: id,
    });
    setScore(res.data.score);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );

  if (score !== null)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-10">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Your Score: {score}%
        </h1>
        {score >= 70 ? (
          <p className="text-green-600 mb-6 text-lg">
            🎉 Congratulations! You passed the quiz.
          </p>
        ) : (
          <p className="text-red-600 mb-6 text-lg">
            Keep learning and try again!
          </p>
        )}

        <button
          onClick={() => navigate("/my-courses")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to My Courses
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-pink-50 py-12 px-6">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-10">
        🧠 Course Quiz
      </h1>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6">
        {questions.map((q, i) => (
          <div key={q.id}>
            <p className="font-semibold text-gray-800 mb-3">
              {i + 1}. {q.question}
            </p>
            {q.options.map((opt) => (
              <label key={opt} className="block mb-2 cursor-pointer">
                <input
                  type="radio"
                  name={`q${i}`}
                  value={opt}
                  onChange={() => setAnswers({ ...answers, [i]: opt })}
                  className="mr-2 accent-blue-600"
                />
                {opt}
              </label>
            ))}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
