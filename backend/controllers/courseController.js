import { supabase } from "../config/supabaseClient.js";

export const getCourses = async (req, res) => {
  const { data, error } = await supabase.from("courses").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const createCourse = async (req, res) => {
  const { title, description, instructor } = req.body;
  const { data, error } = await supabase
    .from("courses")
    .insert([{ title, description, instructor }])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
