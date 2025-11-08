"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function SolutionsPage() {
  const image =
    "https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1742";

  const solutions = [
    {
      title: "Surgical Solutions",
      desc: "Advanced surgical instruments and devices for safer, more precise procedures.",
    },
    {
      title: "Diagnostics",
      desc: "Reliable diagnostic tools to support accurate and timely medical decisions.",
    },
    {
      title: "Patient Monitoring",
      desc: "Innovative monitoring solutions to ensure patient safety and well-being.",
    },
    {
      title: "IV & Infusion Therapy",
      desc: "High-quality infusion systems designed for safety and accuracy.",
    },
    {
      title: "Cardiovascular",
      desc: "Comprehensive devices for cardiovascular treatments and interventions.",
    },
    {
      title: "Blood Management",
      desc: "Solutions that improve patient care in transfusion and blood management.",
    },
  ];

  return (
    <main className="flex flex-col items-center w-full bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      {/* ✅ Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0"
          >
            <Image
              src={image}
              alt="Solutions Banner"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <div
            className="absolute inset-0 opacity-70 mix-blend-multiply"
            style={{ background: "var(--gradient-hero)" }}
          />
        </div>

        <motion.div
          className="relative z-10 flex flex-col justify-end max-w-5xl mx-auto px-6 py-10 text-white h-full"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            A Full Suite of Solutions
          </h1>
          <p className="max-w-3xl text-sm md:text-base opacity-90">
            From concept to completion, we focus on delivering innovative,
            high-quality medical solutions that empower healthcare professionals
            and improve patient outcomes.
          </p>
        </motion.div>
      </section>

      {/* ✅ Solutions Accordion Grid */}
      <motion.section
        className="w-full max-w-6xl px-6 py-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{
            background:
              "linear-gradient(to right, var(--primary), var(--accent))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Our Solutions
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={staggerContainer}
        >
          {solutions.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <Accordion
                type="single"
                collapsible
                className="border border-[var(--border)] rounded-[var(--radius)] bg-[var(--card)] shadow-sm hover:shadow-[var(--shadow-medium)] transition-all duration-300"
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="rounded-[var(--radius)] overflow-hidden"
                >
                  <AccordionTrigger className="px-5 py-4 font-semibold text-[var(--foreground)] bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 hover:from-[var(--primary)]/20 hover:to-[var(--accent)]/20 transition-all duration-300">
                    {s.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 py-4 text-[var(--muted-foreground)] bg-[var(--muted)]">
                    {s.desc}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ✅ Why Choose Us Section */}
      <motion.section
        className="w-full max-w-6xl px-6 py-16 bg-[var(--secondary)] rounded-lg text-center shadow-[var(--shadow-soft)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-3xl font-bold mb-6"
          style={{
            background:
              "linear-gradient(to right, var(--primary), var(--accent))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Why Choose Heuristic Health?
        </h2>
        <p className="text-[var(--muted-foreground)] max-w-3xl mx-auto mb-12 text-lg">
          We combine innovation, quality, and patient-centered solutions to
          deliver products that improve healthcare outcomes worldwide.
        </p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          variants={staggerContainer}
        >
          {[
            {
              title: "Quality Assurance",
              desc: "Every product undergoes rigorous testing and quality checks.",
              gradient: "var(--gradient-blue-teal)",
            },
            {
              title: "Global Reach",
              desc: "Serving over 160 countries with dedicated support teams.",
              gradient: "var(--gradient-green-teal)",
            },
            {
              title: "Innovation",
              desc: "Continuous research to improve patient care and treatment methods.",
              gradient: "var(--gradient-orange-teal)",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card
                className="border border-[var(--border)] text-[var(--foreground)] hover:shadow-[var(--shadow-medium)] transition-all duration-300 overflow-hidden"
                style={{
                  background: item.gradient,
                }}
              >
                <CardContent className="p-6 bg-[var(--card)]/70 backdrop-blur-sm rounded-[var(--radius)]">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--foreground)]/90 leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ✅ Call to Action */}
      <motion.section
        className="w-full max-w-4xl px-6 py-16 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-3xl font-bold mb-4"
          style={{
            background:
              "linear-gradient(to right, var(--primary), var(--accent))",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Ready to Learn More?
        </h2>
        <p className="text-[var(--muted-foreground)] mb-8 text-lg">
          Contact our team today to discover how our solutions can support your
          healthcare facility.
        </p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            asChild
            size="lg"
            className="font-medium shadow-md transition-transform"
            style={{
              background:
                "linear-gradient(to right, var(--primary), var(--accent))",
              color: "var(--primary-foreground)",
            }}
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </motion.div>
      </motion.section>
    </main>
  );
}
