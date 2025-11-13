import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/lib/models/Contact";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "All fields required" }), {
        status: 400,
      });
    }

    await connectToDatabase();
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const messages = await Contact.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(messages), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
