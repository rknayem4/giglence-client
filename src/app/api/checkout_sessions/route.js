import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const {
      proposalId,
      freelancer_email,
      freelancer_id,

      taskId,
      task_name,

      client_email,
      amount,
    } = await req.json();

    const headersList = await headers();
    const origin = headersList.get("origin");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Task #${taskId}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],

      metadata: {
        freelancer_email,
        client_email,
        freelancer_id,
        taskId,
        proposalId,
        task_name,

      },

      success_url: `${origin}/dashboard/client/task-proposals/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/client/task-proposals/cancel`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: err.statusCode || 500,
      },
    );
  }
}
