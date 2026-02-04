"use client";
import React, { useState, useEffect } from "react";
import { Stethoscope, Heart, Activity, Shield, ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const defaultCourses = [
  { 
    title: "First Aid / CPR / AED", 
    description: "A comprehensive update covering wound care, choking response, burns, bleeding control, and CPR skills for all ages.",
    icon: Heart,
    color: "from-sky-500 to-blue-600",
    accent: "sky"
  },
  { 
    title: "Level 1 Medication Aide", 
    description: "State-approved training for administering medications in long-term care settings.",
    icon: Shield,
    color: "from-blue-500 to-sky-600",
    accent: "blue"
  },
  { 
    title: "Certified Medication Technician", 
    description: "Focuses on safe medication administration and charting procedures for healthcare professionals.",
    icon: Activity,
    color: "from-sky-500 to-sky-600",
    accent: "sky"
  },
  { 
    title: "Certified Nursing Assistant", 
    description: "Comprehensive training program preparing you for a rewarding career in patient care.",
    icon: Stethoscope,
    color: "from-sky-600 to-blue-700",
    accent: "sky"
  },
];

const getIconComponent = (iconName) => {
  const icons = {
    Heart,
    Shield,
    Activity,
    Stethoscope,
  };
  return icons[iconName] || Heart;
};

export default function Courses() {
  const [courses, setCourses] = useState(defaultCourses);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      
      const today = new Date();
      const currentDate = today.toISOString().split('T')[0];
      
      const response = await fetch(`http://localhost:3000/api/events/date/${currentDate}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && Array.isArray(data)) {
        const transformedCourses = data.map((event, index) => ({
          title: event.title || event.name || `Course ${index + 1}`,
          description: event.description || event.details || "Professional healthcare training program.",
          icon: getIconComponent(event.icon || ['Heart', 'Shield', 'Activity', 'Stethoscope'][index % 4]),
          color: event.color || defaultCourses[index % defaultCourses.length].color,
          accent: event.accent || defaultCourses[index % defaultCourses.length].accent,
          id: event.id,
          date: event.date,
          duration: event.duration,
        }));
        
        setCourses(transformedCourses.length > 0 ? transformedCourses : defaultCourses);
      } else {
        setCourses(defaultCourses);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.message);
      setCourses(defaultCourses);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="courses" className="py-20 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="course-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="currentColor" className="text-sky-600"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#course-pattern)"/>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-sky-100 px-4 py-2 rounded-full mb-4">
            <CheckCircle className="w-4 h-4 text-sky-600" />
            <span className="text-sm font-semibold text-sky-900">State-Approved Programs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Courses</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Professional healthcare training programs designed to advance your career and improve patient outcomes
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
            <span className="ml-3 text-gray-600">Loading courses...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-8 mb-12">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-lg">
              <span className="text-sm">Failed to load courses. Showing default courses.</span>
            </div>
          </div>
        )}

        {/* Course Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {courses.map((course, idx) => {
              const Icon = typeof course.icon === 'function' ? course.icon : Heart;
              return (
                <div
                  key={course.id || idx}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-900 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {course.description}
                    </p>

                    {/* Course Details */}
                    {(course.date || course.duration) && (
                      <div className="mb-4 space-y-1 text-xs text-gray-500">
                        {course.date && (
                          <p>📅 {new Date(course.date).toLocaleDateString()}</p>
                        )}
                        {course.duration && (
                          <p>⏱️ {course.duration}</p>
                        )}
                      </div>
                    )}

                    {/* CTA */}
                    <button className={`inline-flex items-center gap-2 text-sky-600 font-semibold text-sm group-hover:gap-3 transition-all`}>
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Decorative Element */}
                  <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${course.color} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Healthcare Journey?
          </h3>
          <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who have advanced their careers with VeraCare Health Academy
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/courses"
              className="inline-flex items-center gap-2 bg-white text-sky-600 px-8 py-4 rounded-full font-semibold hover:bg-sky-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              View All Courses
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              Contact Admissions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}