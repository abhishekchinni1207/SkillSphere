import { supabase } from "../config/supabaseClient.js";

export const getQuizByCourse = async (req, res) => {
  const { courseId } = req.params;
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("course_id", courseId);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const submitQuiz = async (req, res) => {
  const { answers } = req.body; // [{questionId, selected}]
  let score = 0;

  for (const a of answers) {
    const { data } = await supabase
      .from("quizzes")
      .select("correct_answer")
      .eq("id", a.questionId)
      .single();

    if (data && data.correct_answer === a.selected) score++;
  }

  res.json({ score, total: answers.length });
};
