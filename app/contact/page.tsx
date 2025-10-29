"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Twitter, Facebook, Linkedin } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("Message sent!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("Failed to send. Try again!");
    }
  };

  return (
    <section className="w-full bg-[#f5f5f5] py-12 sm:py-16 px-4 sm:px-6">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10 px-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#008d61] mb-4">
          Get in Touch
        </h1>
        <p className="text-[#4c4948] text-base sm:text-lg leading-relaxed">
          Have questions, feedback, or need support? Fill out the form below and
          our team will respond as soon as possible. We're here to help you with
          anything related to Terumo Medical Solutions.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md border border-[#a5a9ab]"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-[#4c4948]">
          Contact Us
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full border border-[#a5a9ab] p-2 sm:p-3 rounded mb-4 text-[#4c4948] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008d61] transition"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full border border-[#a5a9ab] p-2 sm:p-3 rounded mb-4 text-[#4c4948] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008d61] transition"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          className="w-full border border-[#a5a9ab] p-2 sm:p-3 rounded mb-4 text-[#4c4948] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#008d61] transition resize-none h-28 sm:h-32"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#008d61] text-white py-2 sm:py-3 rounded hover:bg-[#007a55] transition"
        >
          Send Message
        </button>

        {status && (
          <p className="text-center mt-3 text-sm sm:text-base text-[#4c4948]">
            {status}
          </p>
        )}
      </form>

      {/* Contact Info */}
      <div className="max-w-md mx-auto mt-8 sm:mt-10 text-center text-[#4c4948] text-sm sm:text-base space-y-3 px-2">
        <p className="flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" /> support@terumo.com
        </p>
        <p className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> +1 (800) 555-1234
        </p>
        <p className="flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4" /> Terumo Medical Corporation, Somerset,
          NJ, USA
        </p>
        <p>
          <strong>Business Hours:</strong> Monday to Friday, 9 AM – 6 PM EST
        </p>
      </div>

      {/* Social Media */}
      <div className="max-w-md mx-auto mt-6 flex justify-center gap-4 text-[#008d61]">
        <a href="#" aria-label="Twitter">
          <Twitter className="w-5 h-5 hover:text-[#007a55]" />
        </a>
        <a href="#" aria-label="Facebook">
          <Facebook className="w-5 h-5 hover:text-[#007a55]" />
        </a>
        <a href="#" aria-label="LinkedIn">
          <Linkedin className="w-5 h-5 hover:text-[#007a55]" />
        </a>
      </div>

      {/* FAQ / Response Info */}
      <div className="max-w-3xl mx-auto mt-10 px-2 sm:px-6 text-[#4c4948] text-sm sm:text-base space-y-4">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#008d61]">
          Why Contact Us?
        </h3>
        <p>
          Whether you have questions about our products, need technical support,
          or want to provide feedback, our team is ready to assist you. We aim
          to respond within 24-48 hours.
        </p>
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#008d61]">
          Common Inquiries
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Product availability and ordering</li>
          <li>Technical support for medical devices</li>
          <li>Partnership and business inquiries</li>
          <li>General feedback and suggestions</li>
        </ul>
      </div>
    </section>
  );
}
