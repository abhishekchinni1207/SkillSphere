import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import { supabase } from "./config/supabaseClient.js";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.use(
  "/stripe/webhook",
  express.raw({ type: "application/json" })
);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use((req, res, next) => {
  if (req.originalUrl === "/stripe/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.get("/", (req, res) => res.send("🚀 SkillSphere API running!"));

app.post("/auth/signup", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (signupError) return res.status(400).json({ error: signupError.message });

    const user = signupData.user;

    await supabase.from("profiles").insert([{ id: user.id, name, email }]);

    res.json({ user, message: "Signup successful!" });
  } catch {
    res.status(500).json({ error: "Server error during signup" });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(400).json({ error: error.message });

    res.json({
      message: "Login successful",
      user: data.user,
      session: data.session,
    });
  } catch {
    res.status(500).json({ error: "Server error during login" });
  }
});

app.get("/courses", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("id", { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: "Server error fetching courses" });
  }
});

app.get("/courses/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", req.params.id)
      .maybeSingle();

    if (error) throw error;
    res.json(data);
  } catch {
    res.status(500).json({ error: "Server error fetching course" });
  }
});

app.post("/courses", async (req, res) => {
  const { title, description, instructor, price, image_url, video_url } = req.body;
  try {
    const { data, error } = await supabase
      .from("courses")
      .insert([{ title, description, instructor, price, image_url, video_url }])
      .select()
      .single();

    if (error) throw error;

    res.json({ message: "Course added successfully", course: data });
  } catch {
    res.status(500).json({ error: "Server error adding course" });
  }
});

app.post("/stripe/create-checkout-session", async (req, res) => {
  try {
    const { courseId, amount, userId } = req.body;

    if (!courseId || amount === undefined || !userId)
      return res.status(400).json({ error: "Missing fields" });

    const { data: course } = await supabase
      .from("courses")
      .select("*")
      .eq("id", courseId)
      .maybeSingle();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course?.title || `Course #${courseId}`,
            },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      metadata: {
        userId,
        courseId: String(courseId),
      },
    });

    await supabase.from("enrollments").insert([
      {
        user_id: userId,
        course_id: courseId,
        payment_provider: "stripe",
        payment_id: session.id,
        amount,
        status: "pending",
      },
    ]);

    res.json({ url: session.url });
  } catch {
    res.status(500).json({ error: "Stripe session creation failed" });
  }
});

app.post("/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const courseId = session.metadata.courseId;

    await supabase
      .from("enrollments")
      .update({ status: "paid" })
      .eq("payment_id", session.id);
  }

  res.json({ received: true });
});

app.get("/enrollments/:userId/:courseId", async (req, res) => {
  try {
    const { data } = await supabase
      .from("enrollments")
      .select("*")
      .eq("user_id", req.params.userId)
      .eq("course_id", req.params.courseId)
      .maybeSingle();

    res.json(data || null);
  } catch {
    res.status(500).json({ error: "Server error fetching enrollment" });
  }
});

app.get("/my-courses/:userId", async (req, res) => {
  try {
    const { data } = await supabase
      .from("enrollments")
      .select("courses(*)")
      .eq("user_id", req.params.userId)
      .eq("status", "paid");

    const courses = data?.map((row) => row.courses) || [];
    res.json(courses);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/lessons/:courseId", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("course_id", req.params.courseId)
      .order("order_index", { ascending: true });

    if (error) return res.status(400).json({ error: error.message });

    res.json(data);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/progress/:userId/:courseId", async (req, res) => {
  try {
    const { data } = await supabase
      .from("progress")
      .select("*")
      .eq("user_id", req.params.userId)
      .eq("course_id", req.params.courseId)
      .maybeSingle();

    res.json(data || { completed_percent: 0 });
  } catch {
    res.status(500).json({ error: "Server error fetching progress" });
  }
});

app.post("/progress/update", async (req, res) => {
  try {
    const { userId, courseId, percent } = req.body;

    const { data, error } = await supabase
      .from("progress")
      .upsert([
        {
          user_id: userId,
          course_id: courseId,
          completed_percent: percent,
          updated_at: new Date(),
        },
      ])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    res.json(data[0]);
  } catch {
    res.status(500).json({ error: "Server error updating progress" });
  }
});

app.get("/quiz/:courseId", async (req, res) => {
  try {
    const { data } = await supabase
      .from("quizzes")
      .select("*")
      .eq("course_id", req.params.courseId);

    res.json(data);
  } catch {
    res.status(500).json({ error: "Server error fetching quiz" });
  }
});

app.post("/quiz/submit", async (req, res) => {
  const { answers, courseId } = req.body;
  const { data: questions } = await supabase
    .from("quizzes")
    .select("*")
    .eq("course_id", courseId);

  let correctCount = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.correct_answer) correctCount++;
  });

  const score = Math.round((correctCount / questions.length) * 100);
  res.json({ score });
});

app.post("/certificate/issue", async (req, res) => {
  const { userId, courseId, certificateUrl } = req.body;
  try {
    const { data, error } = await supabase
      .from("certificates")
      .insert([{ user_id: userId, course_id: courseId, certificate_url: certificateUrl }])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    res.json(data[0]);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/certificates/:userId", async (req, res) => {
  try {
    const { data } = await supabase
      .from("certificates")
      .select("*, courses(title)")
      .eq("user_id", req.params.userId);

    res.json(data);
  } catch {
    res.status(500).json({ error: "Server error fetching certificates" });
  }
});

app.get("/test-supabase", async (req, res) => {
  const { data, error } = await supabase.from("courses").select("*");
  res.json({ data, error });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
