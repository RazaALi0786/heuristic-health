"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Briefcase, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import bgImage from "@/public/health-jobs-header.jpg";

// ====== Animations ======
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        // ✅ Absolute URL is safer for Next.js client components
        const baseUrl =
          typeof window !== "undefined"
            ? window.location.origin
            : process.env.NEXT_PUBLIC_BASE_URL || "";

        const res = await fetch(`${baseUrl}/api/jobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          console.error("Server response:", errText);
          throw new Error(`Failed to fetch jobs (${res.status})`);
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setJobs(data);
          localStorage.setItem("postedJobs", JSON.stringify(data));
        } else {
          console.warn("Unexpected data format:", data);
          const storedJobs = JSON.parse(
            localStorage.getItem("postedJobs") || "[]"
          );
          setJobs(storedJobs);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Unable to fetch jobs. Showing locally saved data (if any).");

        const storedJobs = JSON.parse(
          localStorage.getItem("postedJobs") || "[]"
        );
        setJobs(storedJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <motion.div
        className="relative h-auto py-20 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage.src})`,
        }}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.8 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[var(--accent-blue)]/40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl text-center px-4">
          <motion.h1 className="text-4xl sm:text-6xl font-bold text-white">
            Explore{" "}
            <span className="relative bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-teal)] bg-clip-text text-transparent font-semibold after:content-[''] after:absolute after:left-0 after:bottom-1 after:w-full after:h-[3px] after:bg-[var(--accent-teal)]/30 after:rounded-full">
              Healthcare
            </span>{" "}
            Jobs
          </motion.h1>

          <motion.h5
            className="max-w-2xl p-4 mt-4 text-lg text-white/90"
            variants={fadeUp}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Join top hospitals and medical institutions that are shaping the
            future of healthcare and patient care.
          </motion.h5>
        </div>
      </motion.div>

      {/* ===== JOB LISTINGS ===== */}
      <section className="max-w-5xl px-4 py-16 mx-auto">
        <h2 className="mb-2 text-3xl font-bold text-[var(--foreground)]">
          Open Positions
        </h2>
        <h5 className="mb-6 text-[var(--muted-foreground)] text-md">
          {loading
            ? "Loading..."
            : error
            ? error
            : `${jobs.length} opportunities available.`}
        </h5>

        {jobs.length > 0 ? (
          <div className="grid gap-10 md:grid-cols-1">
            {jobs.map((job) => (
              <motion.div
                key={job._id || job.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="transition-all duration-300"
              >
                <Card className="border border-[var(--border)] bg-white/90 backdrop-blur-md shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 rounded-2xl overflow-hidden">
                  <div className="bg-[var(--gradient-blue-teal)] h-2 w-full"></div>

                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div>
                        <h3 className="text-2xl font-semibold text-[var(--foreground)]">
                          {job.title}
                        </h3>
                        <p className="text-sm text-[var(--muted-foreground)] flex items-center gap-2 mt-1">
                          <Building2 className="w-4 h-4 text-[var(--accent-blue)]" />
                          {job.company}
                        </p>
                      </div>

                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${job?.email}&su=General%20Application`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="default"
                        className="hidden sm:flex mt-4 sm:mt-0 bg-[var(--primary)] text-white hover:bg-[hsl(210,80%,40%)] rounded-full px-5 py-2 cursor-pointer transition-all duration-300 flex items-center gap-2 justify-center"
                      >
                        Apply Now
                      </a>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">
                      {job.location && (
                        <span className="flex items-center gap-1 bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] px-3 py-1 rounded-full text-sm font-medium">
                          <MapPin className="w-4 h-4" /> {job.location}
                        </span>
                      )}
                      {job.experience && (
                        <span className="flex items-center gap-1 bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] px-3 py-1 rounded-full text-sm font-medium">
                          <Briefcase className="w-4 h-4" /> {job.experience} yrs
                          Exp
                        </span>
                      )}
                      {job.department && (
                        <span className="flex items-center gap-1 bg-[var(--accent-green)]/10 text-[var(--accent-green)] px-3 py-1 rounded-full text-sm font-medium">
                          🏥 {job.department}
                        </span>
                      )}
                      {job.jobType && (
                        <span className="flex items-center gap-1 bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] px-3 py-1 rounded-full text-sm font-medium">
                          💼 {job.jobType}
                        </span>
                      )}
                    </div>

                    <p className="mt-6 text-[var(--foreground)] leading-relaxed text-base">
                      {job.description}
                    </p>

                    <div className="mt-8 border-t border-[var(--border)] pt-4 flex flex-wrap justify-between text-sm text-[var(--muted-foreground)]">
                      <p>
                        <span className="font-semibold text-[var(--foreground)]">
                          Salary:
                        </span>{" "}
                        ₹{job.salary || "Not disclosed"}
                      </p>
                      <p>
                        <span className="font-semibold text-[var(--foreground)]">
                          Contact:
                        </span>{" "}
                        {job.email || "N/A"}
                      </p>
                    </div>

                     <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${job?.email}&su=General%20Application`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="default"
                        className="flex sm:hidden mt-4 sm:mt-0 bg-[var(--primary)] text-white hover:bg-[hsl(210,80%,40%)] rounded-full px-5 py-2 cursor-pointer transition-all duration-300 flex items-center gap-2"
                      >
                        Apply Now
                      </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-20"
            >
              <p className="text-[var(--muted-foreground)] mb-6 text-lg">
                No job postings available yet.
              </p>
            </motion.div>
          )
        )}
      </section>

      {/* ===== FOOTER SECTION ===== */}
      <motion.div
        className="flex flex-col items-center justify-center h-auto py-16 bg-[var(--secondary)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-3xl font-bold text-center text-[var(--foreground)] sm:text-4xl"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          Don’t See a Perfect Match?
        </motion.h1>

        <motion.h5
          className="max-w-2xl p-4 mt-2 text-xl text-center text-[var(--muted-foreground)]"
          variants={fadeUp}
          transition={{ duration: 1, delay: 0.2 }}
        >
          We’re always looking for talented individuals. Send us your resume and
          tell us how you can make a difference in healthcare.
        </motion.h5>

        <motion.a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=careers@healthexample.com&su=General%20Application"
          target="_blank"
          rel="noopener noreferrer"
          variants={fadeUp}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1 px-4 py-2 mt-3 font-medium text-[var(--foreground)] transition-all duration-300 ease-in-out bg-white border border-[var(--border)] hover:shadow-md rounded-xl hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]"
        >
          Send General Application <ExternalLink size={20} />
        </motion.a>
      </motion.div>
    </div>
  );
}
