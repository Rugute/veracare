import React from "react";

export default function Hero() {
  return (
    <section className="bg-sky-100 pt-32 pb-20 text-center">
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
    </section>
  );
}
