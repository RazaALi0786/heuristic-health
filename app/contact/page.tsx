"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Linkedin,
  Globe2,
  Users2,
  Handshake,
  HelpCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";

const furtherInfoItems = [
  {
    icon: <Globe2 className="w-10 h-10 mx-auto mb-4 text-[var(--primary)]" />,
    title: "Global Offices",
    desc: "Serving healthcare providers worldwide with localized teams for support and distribution.",
  },
  {
    icon: <Users2 className="w-10 h-10 mx-auto mb-4 text-[var(--primary)]" />,
    title: "Customer Support",
    desc: "We provide timely responses and solutions for all technical and business-related queries.",
  },
  {
    icon: (
      <Handshake className="w-10 h-10 mx-auto mb-4 text-[var(--primary)]" />
    ),
    title: "Partnership Opportunities",
    desc: "Collaborate with us to bring cutting-edge healthcare solutions to new markets.",
  },
];

const faqItems = [
  {
    q: "How long does it take to get a response?",
    a: "Our support team typically responds within 24–48 business hours.",
  },
  {
    q: "Do you offer international support?",
    a: "Yes, we have support centers in multiple regions to assist globally.",
  },
  {
    q: "Can I request a product demo?",
    a: "Absolutely! Use the contact form to request a demo and our team will reach out.",
  },
  {
    q: "What kind of partnership opportunities are available?",
    a: "We collaborate with distributors, research institutions, and healthcare organizations worldwide.",
  },
];

export default function ContactPage() {
  const image =
    "https://plus.unsplash.com/premium_photo-1661286686818-5823db33959d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("Failed to send. Please try again.");
    }
  };

  return (
    <main className="w-full bg-[var(--background)] text-[var(--foreground)]">
      {/* 🌈 Hero Section with Background Image */}
      <motion.section
        className="relative py-28 md:py-32 text-center overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* ✅ Fix: Add relative container for the motion div + Image */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="relative w-full h-full"
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Image
              src={image}
              alt="Contact banner background"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* ✅ Semi-transparent overlay */}
          <div
            className="absolute inset-0 opacity-80"
            style={{ background: "var(--gradient-hero)" }}
          />
        </div>

        {/* ✅ Hero Text */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in Touch With Us
          </h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            Have questions, need assistance, or looking to partner with us?
            We’re here to help and would love to hear from you.
          </p>
        </div>
      </motion.section>

      {/* 📨 Contact Section (Two Columns) */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Contact Form */}
        <motion.div
          className="bg-[var(--card)] p-6 sm:p-8 rounded-2xl shadow-lg border border-[var(--border)]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{
              background:
                "linear-gradient(to right, var(--primary), var(--accent))",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Contact Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full border border-[var(--border)] bg-[var(--muted)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full border border-[var(--border)] bg-[var(--muted)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full border border-[var(--border)] bg-[var(--muted)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] transition resize-none h-32"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 rounded-md text-white font-medium transition"
              style={{
                background:
                  "linear-gradient(to right, var(--primary), var(--accent))",
              }}
            >
              Send Message
            </motion.button>

            {status && (
              <p className="text-center mt-3 text-sm text-[var(--muted-foreground)]">
                {status}
              </p>
            )}
          </form>
        </motion.div>

        {/* Right: Contact Info */}
        <motion.div
          className="flex flex-col justify-center text-center md:text-left space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-2xl font-bold"
            style={{
              background:
                "linear-gradient(to right, var(--primary), var(--accent))",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Contact Information
          </h2>

          <div className="space-y-3 text-[var(--muted-foreground)]">
            <p className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-5 h-5 text-[var(--primary)]" />{" "}
              support@heuristichealth.com
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-5 h-5 text-[var(--primary)]" /> +1 (800)
              456-7890
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-5 h-5 text-[var(--primary)]" /> Somerset, NJ,
              United States
            </p>
            <p>
              <strong>Business Hours:</strong> Mon–Fri, 9 AM – 6 PM EST
            </p>
          </div>

          <div className="flex justify-center md:justify-start gap-4 pt-4">
            {[Twitter, Facebook, Linkedin].map((Icon, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.2 }}
                href="#"
                aria-label="social"
              >
                <Icon className="w-6 h-6 text-[var(--primary)]" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 🌍 Further Information Section */}
      <motion.section
        className="py-16 px-6 max-w-5xl mx-auto grid gap-8 md:grid-cols-3 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {furtherInfoItems.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-md"
          >
            {item.icon}
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.section>

      {/* ❓ FAQ Section */}
      <motion.section
        className="py-20 px-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{
            background:
              "linear-gradient(to right, var(--primary), var(--accent))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Frequently Asked Questions
        </h2>

        <Accordion
          type="single"
          collapsible
          className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg"
        >
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="px-5 py-4 font-semibold text-[var(--foreground)] hover:bg-[var(--muted)] transition">
                <HelpCircle className="w-5 h-5 mr-2 text-[var(--primary)]" />
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="px-5 py-3 text-[var(--muted-foreground)] bg-[var(--muted)]">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.section>
    </main>
  );
}
