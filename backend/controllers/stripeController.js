import Stripe from "stripe";
import { supabase } from "../config/supabaseClient.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

// Create checkout session
export const createCheckoutSession = async (req, res) => {
  try {
    const { courseId, amount, userId } = req.body;

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: `Course #${courseId}` },
            unit_amount: Math.round(amount * 100), // in paise
          },
          quantity: 1,
        },
      ],
      metadata: { courseId, userId },
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
    });

    // Insert enrollment as pending
    await supabase
      .from("enrollments")
      .insert([
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
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Unable to create Stripe session" });
  }
};

// Webhook handler for payment success
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { courseId, userId } = session.metadata;

    // Update enrollment status to paid
    await supabase
      .from("enrollments")
      .update({ status: "paid", payment_id: session.id })
      .eq("payment_id", session.id);
  }

  res.json({ received: true });
};
