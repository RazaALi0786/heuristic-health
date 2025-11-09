import { connectToDatabase } from "@/lib/mongodb";
import Job from "@/lib/models/Job";

export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await Job.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(jobs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("❌ Error fetching jobs:", err.message || err);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch jobs",
        details: err.message || String(err),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const {
      title,
      company,
      description,
      experience,
      salary,
      email,
      department,
      location,
      jobType,
    } = await req.json();

    if (!title || !company || !description || !email) {
      return new Response(
        JSON.stringify({
          error: "Title, company, description, and email are required.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await connectToDatabase();

    const newJob = new Job({
      title,
      company,
      description,
      experience,
      salary,
      email,
      department,
      location,
      jobType,
    });

    await newJob.save();

    return new Response(
      JSON.stringify({ success: true, message: "Job posted successfully!" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("❌ Error while posting job:", err.message || err);
    return new Response(
      JSON.stringify({
        error: "Failed to create job",
        details: err.message || String(err),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
