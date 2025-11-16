import { supabase } from "../config/supabaseClient.js";

export const getEnrollment = async (req, res) => {
  const { userId, courseId } = req.params;
  try {
    const { data, error } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .maybeSingle();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data || null);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
