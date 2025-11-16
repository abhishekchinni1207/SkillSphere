import { supabase } from "../config/supabaseClient.js";

export const getUserProgress = async (req, res) => {
  const { userId, courseId } = req.params;

  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .single();

  if (error && error.code !== "PGRST116") {
    return res.status(400).json({ error: error.message });
  }

  res.json(data || { completion: 0 });
};

export const updateProgress = async (req, res) => {
  const { userId, courseId, completion } = req.body;

  // Check if entry exists
  const { data: existing } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", userId)
    .eq("course_id", courseId)
    .maybeSingle();

  if (existing) {
    const { data, error } = await supabase
      .from("progress")
      .update({ completion, updated_at: new Date() })
      .eq("id", existing.id)
      .select()
      .single();
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } else {
    const { data, error } = await supabase
      .from("progress")
      .insert([{ user_id: userId, course_id: courseId, completion }])
      .select()
      .single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  }
};
