import { connectToDatabase } from "@/lib/mongodb";
import Job from "@/lib/models/Job";

// PATCH (update job)
export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // ✅ await the params
    await connectToDatabase();
    const updatedData = await req.json();

    const job = await Job.findByIdAndUpdate(id, updatedData, { new: true });

    if (!job) {
      return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, job }), { status: 200 });
  } catch (err: any) {
    console.error("Error updating job:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// DELETE (remove job)
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // ✅ await the params
    await connectToDatabase();

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    console.error("Error deleting job:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
