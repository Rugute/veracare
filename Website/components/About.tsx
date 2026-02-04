import React from "react";
import { Target, Eye, Users, Mail, Phone, Award, BookOpen, Heart, Shield } from "lucide-react";

const teamMembers = [
  { 
    name: "Dr. Jane Doe", 
    role: "Founder & CEO",
    specialization: "Healthcare Administration"
  },
  { 
    name: "John Smith", 
    role: "Director of Training",
    specialization: "Clinical Education"
  },
  { 
    name: "Sarah Johnson", 
    role: "Lead Instructor",
    specialization: "Emergency Care"
  },
  { 
    name: "Michael Brown", 
    role: "Curriculum Developer",
    specialization: "Medical Technology"
  },
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to the highest standards in healthcare education"
  },
  {
    icon: Heart,
    title: "Compassion",
    description: "Fostering empathy and patient-centered care"
  },
  {
    icon: BookOpen,
    title: "Innovation",
    description: "Embracing modern teaching methods and technology"
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Upholding ethical practices in all we do"
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <circle cx="40" cy="40" r="1.5" fill="currentColor" className="text-sky-600"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-pattern)"/>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 space-y-20">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-sky-100 px-4 py-2 rounded-full mb-6">
            <Heart className="w-4 h-4 text-sky-600" />
            <span className="text-sm font-semibold text-sky-900">About Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              VeraCare Health Academy
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Excellence in Clinical Education - Empowering Healthcare Professionals Since Our Founding
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Mission */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg">
                <Target className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                VeraCare Health Academy is committed to providing top-notch healthcare
                training and resources, empowering professionals with the knowledge and tools
                needed to improve patient outcomes and advance their careers in healthcare.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-sky-600 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-sky-600 flex items-center justify-center mb-6 shadow-lg">
                <Eye className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be a leading institution in healthcare education, fostering innovation,
                professionalism, and community impact across Africa and beyond, while
                setting new standards for clinical excellence and accessibility.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at VeraCare Health Academy
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-sky-100 px-4 py-2 rounded-full mb-4">
              <Users className="w-4 h-4 text-sky-600" />
              <span className="text-sm font-semibold text-sky-900">Meet Our Experts</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced healthcare professionals dedicated to your success
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative">
                  {/* Avatar Placeholder */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sky-600 font-semibold text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-xs">{member.specialization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10"></div>
            <div className="relative">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
                <p className="text-sky-100">
                  Have questions? We're here to help you start your healthcare journey
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sky-100 text-sm mb-1">Email Us</p>
                    <a href="mailto:info@veracarehealthacademy.com" className="font-semibold hover:underline">
                      info@veracarehealthacademy.com
                    </a>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sky-100 text-sm mb-1">Call Us</p>
                    <a href="tel:+254700000000" className="font-semibold hover:underline">
                      +254 700 000 000
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;