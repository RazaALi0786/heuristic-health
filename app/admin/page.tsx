"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function AdminJobPost() {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Job posted successfully!");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <Card className="shadow-[var(--shadow-medium)] border border-[var(--border)] bg-[var(--card)]">
          <CardHeader className="text-center bg-[var(--gradient-blue-teal)] text-white rounded-t-xl py-6">
            <CardTitle className="text-2xl font-semibold tracking-wide">
              Admin Job Posting Panel
            </CardTitle>
            <p className="text-sm opacity-90">
              Add new job openings for your medical platform
            </p>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Job Title */}
              <div className="grid gap-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Medical Officer"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Company */}
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="e.g. Apollo Hospitals"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Job Description */}
              <div className="grid gap-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Write the job responsibilities and requirements..."
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Experience & Salary */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="experience">Experience (in years)</Label>
                  <Input
                    id="experience"
                    name="experience"
                    placeholder="e.g. 2-5"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="salary">Salary (per annum)</Label>
                  <Input
                    id="salary"
                    name="salary"
                    placeholder="e.g. ₹5,00,000"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. hr@apollo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Department & Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    placeholder="e.g. Cardiology"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. Mumbai, India"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Job Type */}
              <div className="grid gap-2">
                <Label htmlFor="jobType">Job Type</Label>
                <Input
                  id="jobType"
                  name="jobType"
                  placeholder="e.g. Full-Time / Part-Time / Contract"
                  value={formData.jobType}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="pt-4"
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
      </motion.div>
    </div>
  );
}
