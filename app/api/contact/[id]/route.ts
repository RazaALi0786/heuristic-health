import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/lib/models/Contact";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();

    // ⬅️ FIX: params is a Promise in Next.js 15
    const { id } = await context.params;

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
