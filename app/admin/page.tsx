"use client";

import { useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("jobs");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
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
  const [editingJobId, setEditingJobId] = useState(null);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("isAdminLoggedIn") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchJobs = async () => {
        try {
          const res = await fetch("/api/jobs");
          const data = await res.json();
          if (Array.isArray(data)) setJobs(data);
        } catch (err) {
          console.error("Error fetching jobs:", err);
        }
      };
      fetchJobs();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === "admin" && loginData.password === "12345") {
      localStorage.setItem("isAdminLoggedIn", "true");
      setIsAuthenticated(true);
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    setIsAuthenticated(false);
  };

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingJobId ? "PATCH" : "POST";
    const url = editingJobId ? `/api/jobs/${editingJobId}` : "/api/jobs";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to save job");
        return;
      }

      alert(editingJobId ? "✅ Job updated!" : "✅ Job posted!");

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
      setEditingJobId(null);

      // Refresh list
      const refreshed = await fetch("/api/jobs").then((r) => r.json());
      setJobs(refreshed);
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  // ✅ Edit existing job
  const handleEdit = (job) => {
    setJobData(job);
    setEditingJobId(job._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete job
  const handleDelete = async (id) => {
    console.log("Deleting job with ID:", id);
    if (!confirm("Delete this job permanently?")) return;

    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to delete job");
        return;
      }

      setJobs(jobs.filter((job) => job._id !== id));
      alert("🗑️ Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  if (!mounted) return null; // or a spinner

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* 🔹 Background Image */}
      <div
        className="absolute inset-0 bg-cover blur-sm bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${adminBg.src})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>

      {!isAuthenticated ? (
        // ---------------- LOGIN FORM ----------------
        <div className="relative z-10 w-full max-w-md bg-[var(--card)] p-8 rounded-xl shadow-[var(--shadow-medium)] backdrop-blur-md border border-[var(--border)]">
          <h2 className="text-3xl font-bold text-center mb-6 ">
            Admin <span className="text-[var(--primary)]">Login</span>
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="grid gap-2">
              <Label className="text-var[--foreground]">Username</Label>
              <Input
                type="text"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
                placeholder="Enter username"
                className="p-3 rounded-md"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-var[--foreground]">Password</Label>
              <Input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                placeholder="Enter password"
                className="p-3 rounded-md"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full text-white font-semibold bg-[var(--primary)] hover:bg-[hsl(210,80%,40%)]"
            >
              Login
            </Button>
          </form>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-4xl">
          {/* Header */}
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-center mb-2"
            style={{
              background:
                "linear-gradient(to right, var(--primary), var(--accent))",
              WebkitBackgroundClip: "text",
            }}
          >
            Admin <span style={{ color: "transparent" }}>Dashboard</span>
          </motion.h2>

          <div className="flex justify-between">
            <div></div>
            <Button
              onClick={handleLogout}
              className={`px-6 py-2 mb-4 rounded-lg cursor-pointer font-medium transition-all duration-300 ${
                activeTab === "jobs"
                  ? "bg-[var(--destructive)] text-white"
                  : "border border-[var(--border)]"
              }`}
            >
              Logout
            </Button>
          </div>

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
                    <CardHeader
                      style={{ background: "var(--gradient-blue-teal)" }}
                      className="rounded-t-xl py-6 text-center text-[var(--input)]"
                    >
                      <CardTitle className="text-2xl font-semibold">
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

                  {/*  Posted Jobs Below */}
                  {jobs.length > 0 && (
                    <div className="mt-10 space-y-4">
                      <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">
                        Posted Jobs
                      </h3>

                      <AnimatePresence>
                        {jobs.map((job) => (
                          <motion.div
                            key={job._id || job.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Card className="border border-[var(--border)] shadow-[var(--shadow-soft)] bg-[var(--background)]">
                              <CardContent className="p-5">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="text-lg font-semibold text-[var(--foreground)]">
                                      {job?.title}
                                    </h4>
                                    <p className="text-sm text-[var(--muted-foreground)] mt-1">
                                      {job?.company} • {job?.jobType || "N/A"}
                                    </p>
                                  </div>
                                  <span className="text-sm text-[var(--muted-foreground)]">
                                    {job?.location}
                                  </span>
                                </div>

                                <p className="mt-3 text-[var(--foreground)] text-sm">
                                  {job?.description}
                                </p>

                                {/* ✅ Edit/Delete Buttons */}
                                <div className="flex justify-end gap-3 mt-4">
                                  <Button
                                    onClick={() => handleEdit(job)}
                                    variant="outline"
                                    className="text-[var(--accent-blue)] border-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10"
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    onClick={() =>
                                      handleDelete(job._id || job.id)
                                    }
                                    variant="destructive"
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                  >
                                    Delete
                                  </Button>
                                </div>
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
                    <CardHeader
                      className="bg-[var(--gradient-green-teal)] text-white rounded-t-xl py-6 text-center"
                      style={{ background: "var(--gradient-blue-teal)" }}
                    >
                      <CardTitle className="text-2xl font-semibold">
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
      )}
    </div>
  );
}
