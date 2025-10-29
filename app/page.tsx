"use client";

import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import heroImage from "@/public/hero-medical.jpg";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden">
      {/* Background Image + Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Healthcare professionals collaborating"
          fill
          className="object-cover"
          priority
        />
        {/* ✅ Use your gradient variable */}
        <div
          className="absolute inset-0 opacity-90"
          style={{ background: "var(--gradient-hero)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
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
              color: "color-mix(in srgb, var(--primary-foreground) 80%, white)",
            }}
          >
            Connect with top healthcare facilities nationwide. Explore
            opportunities in allied health, travel nursing, locum tenens, and
            more.
          </p>

          {/* Search Bar */}
          {/* <div
            className="rounded-lg p-2 shadow-lg"
            style={{
              background: "var(--card)",
              boxShadow: "var(--shadow-medium)",
            }}
          >
            <div className="flex flex-col md:flex-row gap-2">
              <div
                className="flex-1 flex items-center gap-2 px-3 py-2 rounded-md"
                style={{ background: "var(--muted)" }}
              >
                <Search
                  className="h-5 w-5"
                  style={{ color: "var(--muted-foreground)" }}
                />
                <Input
                  placeholder="Job title, specialty, or keyword"
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-base pl-3.5"
                  style={{ color: "var(--foreground)" }}
                />
              </div>

              <div
                className="flex-1 flex items-center gap-2 px-3 py-2 rounded-md"
                style={{ background: "var(--muted)" }}
              >
                <MapPin
                  className="h-5 w-5"
                  style={{ color: "var(--muted-foreground)" }}
                />
                <Input
                  placeholder="City, state, or zip code"
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-base pl-3.5"
                  style={{ color: "var(--foreground)" }}
                />
              </div>

              <Button
                size="lg"
                className="transition-opacity"
                style={{
                  background:
                    "linear-gradient(to right, var(--primary), var(--accent))",
                  color: "var(--primary-foreground)",
                }}
              >
                Search Jobs
              </Button>
            </div>
          </div> */}

          {/* Search Button */}

          <div
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
          </div>

          {/* Quick Stats */}
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              ["5,000+", "Active Jobs"],
              ["500+", "Healthcare Facilities"],
              ["98%", "Satisfaction"],
            ].map(([value, label]) => (
              <div key={label}>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
