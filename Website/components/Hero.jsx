"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Play, Award, Users, BookOpen } from "lucide-react";

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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-900 via-blue-400 to-sky-900 pt-24 pb-20">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="white" />
              <path d="M45 45h10v10h10v10h-10v10h-10v-10h-10v-10h10z" fill="white" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)"/>
        </svg>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-900/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Award className="w-4 h-4 text-sky-300" />
              <span className="text-sm font-semibold text-sky-100">State-Approved Clinical Training</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Welcome to
                <span className="block bg-gradient-to-r from-sky-200 via-blue-200 to-sky-200 bg-clip-text text-transparent mt-2">
                  VeraCare Health Academy
                </span>
              </h1>
              <p className="text-xl text-sky-100 leading-relaxed max-w-2xl">
                Empowering the next generation of healthcare professionals through 
                high-quality, accessible, and practical clinical education.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-sky-200">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">15+</div>
                <div className="text-sm text-sky-200">Expert Instructors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-sky-200">Success Rate</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#courses"
                className="group inline-flex items-center gap-2 bg-white text-sky-900 px-8 py-4 rounded-full font-semibold hover:bg-sky-50 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-sky-900/30"
              >
                Explore Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                <Play className="w-5 h-5" />
                Watch Video
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sky-200">
                <Users className="w-5 h-5" />
                <span className="text-sm">Join our community</span>
              </div>
              <div className="flex items-center gap-2 text-sky-200">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm">Interactive learning</span>
              </div>
            </div>
          </div>

          {/* Right: Slideshow */}
          <div className="relative">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Images */}
              {images.map((src, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === current ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Healthcare training ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 to-transparent"></div>
                </div>
              ))}

              {/* Slide Indicators */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === current
                        ? "w-8 h-2 bg-white"
                        : "w-2 h-2 bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-sky-400 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-2xl p-6 max-w-xs hidden lg:block">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Certified Programs</h3>
                  <p className="text-sm text-gray-600">
                    All courses are state-approved and accredited
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}