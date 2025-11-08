"use client";

import {
  Search,
  MapPin,
  HeartPulse,
  Users,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import heroImage from "@/public/hero-medical.jpg";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function HomePage() {
  const router = useRouter();

  return (
    <main>
      {/* ✅ HERO SECTION */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Healthcare professionals collaborating"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0 opacity-90"
            style={{ background: "var(--gradient-hero)" }}
          />
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-4 py-24 md:py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeUp}
        >
          <div className="max-w-3xl">
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ color: "var(--primary-foreground)" }}
            >
              Find Your Next Healthcare Career Opportunity
            </h1>

            <p
              className="text-xl mb-8"
              style={{
                color:
                  "color-mix(in srgb, var(--primary-foreground) 80%, white)",
              }}
            >
              Connect with top healthcare facilities nationwide. Explore
              opportunities in allied health, travel nursing, locum tenens, and
              more.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg p-2 shadow-lg w-fit"
              style={{
                background: "var(--card)",
                boxShadow: "var(--shadow-medium)",
              }}
            >
              <Button
                size="lg"
                className="transition-opacity cursor-pointer"
                style={{
                  background:
                    "linear-gradient(to right, var(--primary), var(--accent))",
                  color: "var(--primary-foreground)",
                }}
                onClick={() => router.push("/jobs")}
              >
                Search Jobs
                <Search
                  className="h-5 w-5 ml-2"
                  size={16}
                  style={{ color: "var(--primary-foreground)" }}
                />
              </Button>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-6">
              {[
                ["5,000+", "Active Jobs"],
                ["500+", "Healthcare Facilities"],
                ["98%", "Satisfaction"],
              ].map(([value, label], i) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <div
                    className="text-3xl font-bold"
                    style={{ color: "var(--primary-foreground)" }}
                  >
                    {value}
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      color:
                        "color-mix(in srgb, var(--primary-foreground) 70%, white)",
                    }}
                  >
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ✅ ABOUT SECTION */}
      <motion.section
        className="py-20 bg-[var(--background)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: "var(--foreground)" }}
          >
            About Us
          </h2>
          <p
            className="text-lg mb-10 leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            At <strong>MedConnect Careers</strong>, we’re redefining healthcare
            recruitment. Our mission is to bridge skilled healthcare
            professionals with the facilities that need them most — ensuring
            better care, greater satisfaction, and stronger teams across the
            country.
          </p>

          <motion.div whileHover={{ scale: 1.02 }}>
            <Card
              className="border-none shadow-lg mx-auto max-w-3xl"
              style={{
                background: "var(--gradient-card)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Our Commitment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--foreground)" }}
                >
                  We’re committed to empowering medical professionals with
                  transparent job listings, expert career guidance, and support
                  every step of the way — from your first application to your
                  next big opportunity.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* ✅ WHY CHOOSE US SECTION */}
      <motion.section
        className="py-20"
        style={{ background: "var(--secondary)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <motion.h2
            className="text-3xl font-bold mb-12"
            style={{ color: "var(--foreground)" }}
            variants={fadeUp}
          >
            Why Choose MedConnect?
          </motion.h2>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                icon: <HeartPulse className="h-10 w-10 mb-4" />,
                title: "Trusted Healthcare Network",
                text: "Partnering with 500+ hospitals and clinics nationwide to offer verified, rewarding positions.",
              },
              {
                icon: <Users className="h-10 w-10 mb-4" />,
                title: "Personalized Career Support",
                text: "We provide tailored guidance and resume optimization to help you stand out.",
              },
              {
                icon: <ShieldCheck className="h-10 w-10 mb-4" />,
                title: "Secure and Transparent",
                text: "All job listings are verified and compliant, ensuring your peace of mind.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card
                  className="border-none p-6 transition-transform h-full"
                  style={{
                    background: "var(--card)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  <CardContent className="text-center">
                    <div className="flex justify-center text-[var(--primary)]">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {feature.text}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ✅ TESTIMONIALS SECTION */}
      <motion.section
        className="py-20 bg-[var(--background)]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <motion.h2
            className="text-3xl font-bold mb-12"
            style={{ color: "var(--foreground)" }}
            variants={fadeUp}
          >
            What Our Professionals Say
          </motion.h2>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                name: "Dr. Sarah Patel",
                text: "“MedConnect made my job search effortless. I found the perfect placement within two weeks!”",
              },
              {
                name: "James Lee, RN",
                text: "“The team provided excellent support and interview prep. I landed my dream travel nursing job.”",
              },
              {
                name: "Lina Gomez, PT",
                text: "“They truly understand healthcare careers. The experience was smooth, transparent, and stress-free.”",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 150 }}
              >
                <Card
                  className="border-none p-6 shadow-lg"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <CardContent>
                    <Star className="mx-auto mb-4 text-[var(--accent)]" />
                    <p
                      className="italic mb-4"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {testimonial.text}
                    </p>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ✅ FINAL CTA SECTION */}
      <motion.section
        className="py-20 text-center text-white"
        style={{ background: "var(--gradient-blue-teal)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Explore thousands of verified healthcare job opportunities. Join
            MedConnect and grow your career with confidence.
          </p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              size="lg"
              className="transition-opacity cursor-pointer"
              style={{
                background: "var(--primary-foreground)",
                color: "var(--primary)",
              }}
              onClick={() => router.push("/jobs")}
            >
              Browse Open Positions
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
