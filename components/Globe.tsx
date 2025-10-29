"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function TerumoGlobe() {
  const globeRef = useRef();
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.5;
      controls.enableZoom = false; // disable zoom by default

      // Enable zoom only when mouse is over the globe
      const canvas = globeRef.current.renderer().domElement;
      canvas.addEventListener("mouseenter", () => {
        controls.enableZoom = true;
      });
      canvas.addEventListener("mouseleave", () => {
        controls.enableZoom = false;
      });
    }

    setPoints([
      {
        name: "Tokyo HQ",
        lat: 35.6895,
        lng: 139.6917,
        size: 0.5,
        color: "#008d61",
      },
      {
        name: "Somerset, NJ",
        lat: 40.5438,
        lng: -74.5401,
        size: 0.5,
        color: "#007a55",
      },
      {
        name: "Global Reach",
        lat: 20.0,
        lng: 0.0,
        size: 0.3,
        color: "#4c4948",
      },
    ]);
  }, []);

  return (
    <div className="w-fit h-[500px] mt-10 rounded-xl shadow-lg bg-white">
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundColor="#ffffff"
        showAtmosphere={true}
        atmosphereColor="#008d61"
        atmosphereAltitude={0.25}
        pointsData={points}
        pointLat={(d) => d.lat}
        pointLng={(d) => d.lng}
        pointColor={() => "#008d61"}
        pointAltitude={(d) => d.size}
        pointRadius={0.15}
        pointLabel={(d) => `${d.name}`}
      />
    </div>
  );
}
