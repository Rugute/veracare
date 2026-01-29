"use client";
import React, { useState, useEffect } from "react";

export default function Hero() {
  const images = [
    "/images/hero0.jpg",
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
    "/images/hero4.jpg",
  ];

  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5000ms = 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-sky-100 pt-32 pb-20 text-center relative overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to Veracare Health Academy
      </h2>
      <p className="text-gray-700 max-w-2xl mx-auto mb-6">
        Learn modern healthcare practices, get certified, and improve your career with our online courses.
      </p>
      <a
        href="#courses"
        className="bg-sky-600 text-white px-6 py-3 rounded-full hover:bg-sky-700 transition"
      >
        Explore Courses
      </a>

      {/* Slideshow Section */}
      <div className="mt-12 w-full max-w-4xl mx-auto relative h-64 md:h-96">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Hero ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
