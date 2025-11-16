import { supabase } from "../config/supabaseClient.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: data.user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return res.status(400).json({ error: error.message });
  res.json({ session: data.session, user: data.user });
};

export const profile = async (req, res) => {
  const userId = req.params.id;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
