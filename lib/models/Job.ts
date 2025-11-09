import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: false,
      trim: true,
    },
    salary: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    department: {
      type: String,
      required: false,
      trim: true,
    },
    location: {
      type: String,
      required: false,
      trim: true,
    },
    jobType: {
      type: String,
    //   enum: ["Full-time", "Part-time", "Internship", "Remote", "Contract"], // example values
      required: false,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
