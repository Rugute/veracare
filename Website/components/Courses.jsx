import React from "react";
import { Stethoscope, Heart, Activity, Shield, ArrowRight, CheckCircle } from "lucide-react";

const courses = [
  { 
    title: "First Aid / CPR / AED", 
    description: "A comprehensive update covering wound care, choking response, burns, bleeding control, and CPR skills for all ages.",
    icon: Heart,
    color: "from-teal-500 to-emerald-600",
    accent: "teal"
  },
  { 
    title: "Level 1 Medication Aide", 
    description: "State-approved training for administering medications in long-term care settings.",
    icon: Shield,
    color: "from-emerald-500 to-cyan-600",
    accent: "emerald"
  },
  { 
    title: "Certified Medication Technician", 
    description: "Focuses on safe medication administration and charting procedures for healthcare professionals.",
    icon: Activity,
    color: "from-cyan-500 to-teal-600",
    accent: "cyan"
  },
  { 
    title: "Certified Nursing Assistant", 
    description: "Comprehensive training program preparing you for a rewarding career in patient care.",
    icon: Stethoscope,
    color: "from-teal-600 to-emerald-700",
    accent: "teal"
  },
];

export default function Courses() {
  return (
    <section id="courses" className="py-20 bg-gradient-to-b from-white to-teal-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="course-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="currentColor" className="text-teal-600"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#course-pattern)"/>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full mb-4">
            <CheckCircle className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-teal-900">State-Approved Programs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Courses</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Professional healthcare training programs designed to advance your career and improve patient outcomes
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {courses.map((course, idx) => {
            const Icon = course.icon;
            return (
              <div
                key={idx}
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-900 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {course.description}
                  </p>

                  {/* CTA */}
                  <button className={`inline-flex items-center gap-2 text-${course.accent}-600 font-semibold text-sm group-hover:gap-3 transition-all`}>
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

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Healthcare Journey?
          </h3>
          <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who have advanced their careers with VeraCare Health Academy
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/courses"
              className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-teal-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
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