"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import adminBg from "@/public/health-admin-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState([]); // ✅ new jobs array

  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    description: "",
    experience: "",
    salary: "",
    email: "",
    department: "",
    location: "",
    jobType: "",
  });

  const [messages] = useState([
    {
      name: "John Doe",
      email: "john@example.com",
      message: "Interested in cardiology position.",
    },
    {
      name: "Aarav Sharma",
      email: "aarav@medmail.com",
      message: "Inquiry about job posting update.",
    },
  ]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // ✅ Add job on submit
  const handleSubmit = (e) => {
  e.preventDefault();

  const newJob = { ...jobData, id: Date.now() };
  const updatedJobs = [newJob, ...jobs];
  setJobs(updatedJobs);

  // ✅ Save to localStorage
  localStorage.setItem("postedJobs", JSON.stringify(updatedJobs));

  setJobData({
    title: "",
    company: "",
    description: "",
    experience: "",
    salary: "",
    email: "",
    department: "",
    location: "",
    jobType: "",
  });

  alert("Job posted successfully!");
};


  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start p-6 overflow-hidden">
      {/* 🔹 Background Image */}
      <div
        className="absolute inset-0 bg-cover blur-sm bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${adminBg.src})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{
            background:
              "linear-gradient(to right, var(--primary), var(--accent))",
            WebkitBackgroundClip: "text",
          }}
        >
          Admin <span style={{ color: "transparent" }}>Dashboard</span>
        </motion.h2>

        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-8 justify-center">
          <Button
            variant={activeTab === "jobs" ? "default" : "outline"}
            onClick={() => setActiveTab("jobs")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeTab === "jobs"
                ? "bg-[var(--primary)] text-white"
                : "border border-[var(--border)]"
            }`}
          >
            Job Postings
          </Button>
          <Button
            variant={activeTab === "messages" ? "default" : "outline"}
            onClick={() => setActiveTab("messages")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeTab === "messages"
                ? "bg-[var(--primary)] text-white"
                : "border border-[var(--border)]"
            }`}
          >
            Contact Messages
          </Button>
        </div>

        {/* Tab Content */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {activeTab === "jobs" ? (
              <motion.div
                key="jobs"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
              >
                {/* Job Form */}
                <Card className="shadow-[var(--shadow-medium)] border border-[var(--border)] bg-[var(--card)]">
                  <CardHeader className="bg-[var(--gradient-blue-teal)] text-white rounded-t-xl py-6 text-center">
                    <CardTitle className="text-xl font-semibold">
                      Post a New Job
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-8 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* inputs same as your current version */}
                      {Object.entries({
                        title: "Job Title",
                        company: "Company",
                        description: "Job Description",
                      }).map(([name, label]) => (
                        <div className="grid gap-2" key={name}>
                          <Label htmlFor={name}>{label}</Label>
                          {name === "description" ? (
                            <Textarea
                              id={name}
                              name={name}
                              placeholder="Write here..."
                              rows={5}
                              value={jobData[name]}
                              onChange={handleChange}
                              className="w-full border border-[var(--border)] bg-[var(--muted)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition"
                              required
                            />
                          ) : (
                            <Input
                              id={name}
                              name={name}
                              placeholder={`Enter ${label}`}
                              value={jobData[name]}
                              onChange={handleChange}
                              className="w-full border border-[var(--border)] bg-[var(--muted)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition"
                              required
                            />
                          )}
                        </div>
                      ))}

                      {/* Additional Fields */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Experience (Years)</Label>
                          <Input
                            name="experience"
                            value={jobData.experience}
                            onChange={handleChange}
                            className="w-full border border-[var(--border)] bg-[var(--muted)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition"
                            placeholder="e.g. 2-5"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Salary (per annum)</Label>
                          <Input
                            name="salary"
                            value={jobData.salary}
                            onChange={handleChange}
                            className="w-full border border-[var(--border)] bg-[var(--muted)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition"
                            placeholder="₹5,00,000"
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input
                          name="email"
                          type="email"
                          value={jobData.email}
                          onChange={handleChange}
                          className="w-full border border-[var(--border)] bg-[var(--muted)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition"
                          placeholder="hr@hospital.com"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Department</Label>
                          <Input
                            name="department"
                            value={jobData.department}
                            onChange={handleChange}
                            className="w-full border border-[var(--border)] bg-[var(--muted)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition"
                            placeholder="Cardiology"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Location</Label>
                          <Input
                            name="location"
                            value={jobData.location}
                            onChange={handleChange}
                            className="w-full border border-[var(--border)] bg-[var(--muted)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition"
                            placeholder="Mumbai, India"
                          />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label>Job Type</Label>
                        <Input
                          name="jobType"
                          value={jobData.jobType}
                          onChange={handleChange}
                          className="w-full border border-[var(--border)] bg-[var(--muted)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition"
                          placeholder="Full-Time / Contract"
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Button
                          type="submit"
                          className="w-full text-white font-semibold bg-[var(--primary)] hover:bg-[hsl(210,80%,40%)]"
                        >
                          Post Job
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>

                {/* ✅ Posted Jobs Below */}
                {jobs.length > 0 && (
                  <div className="mt-10 space-y-4">
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                      Posted Jobs
                    </h3>

                    <AnimatePresence>
                      {jobs.map((job) => (
                        <motion.div
                          key={job.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="border border-[var(--border)] shadow-[var(--shadow-soft)] bg-[var(--background)]">
                            <CardContent className="p-5">
                              <div className="flex justify-between items-center">
                                <h4 className="text-lg font-semibold text-[var(--foreground)]">
                                  {job?.title}
                                </h4>
                                <span className="text-sm text-[var(--muted-foreground)]">
                                  {job?.location}
                                </span>
                              </div>
                              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                                {job?.company} • {job?.jobType || "N/A"}
                              </p>
                              <p className="mt-3 text-[var(--foreground)] text-sm">
                                {job?.description}
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            ) : (
              // 💬 Contact Messages tab unchanged
              <motion.div
                key="messages"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="shadow-[var(--shadow-medium)] border border-[var(--border)] bg-[var(--card)]">
                  <CardHeader className="bg-[var(--gradient-green-teal)] text-white rounded-t-xl py-6 text-center">
                    <CardTitle className="text-xl font-semibold">
                      Contact Messages
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-6 space-y-4">
                    {messages.length > 0 ? (
                      messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className="border border-[var(--border)] rounded-xl p-4 shadow-[var(--shadow-soft)]"
                        >
                          <p className="font-semibold text-[var(--foreground)]">
                            {msg.name}{" "}
                            <span className="text-sm text-[var(--muted-foreground)]">
                              ({msg.email})
                            </span>
                          </p>
                          <p className="mt-2 text-[var(--foreground)] text-sm">
                            {msg.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-[var(--muted-foreground)]">
                        No contact messages yet.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
