"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, MessageSquare } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-teal-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M25 25h10v10h10v10h-10v10h-10v-10h-10v-10h10z" fill="currentColor" className="text-teal-600"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-pattern)"/>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full mb-4">
                <MessageSquare className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-semibold text-teal-900">We're Here to Help</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Get in <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Touch</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Have questions about our programs? We're here to help you take the next step in your healthcare career.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Address */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Visit Us</h3>
                    <p className="text-gray-600 text-sm">
                      1753 Timber Creek Dr<br />
                      Columbia, MO 65202, USA
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                    <a href="tel:+012345678890" className="text-teal-600 hover:text-teal-700 font-semibold">
                      +012 345 67890
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                    <a href="mailto:info@veracarehealthacademy.com" className="text-teal-600 hover:text-teal-700 font-semibold">
                      info@veracarehealthacademy.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl p-6 text-white">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-2">Office Hours</h3>
                  <div className="space-y-1 text-teal-100 text-sm">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-20 transition-all duration-200 outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-20 transition-all duration-200 outline-none"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:ring-opacity-20 transition-all duration-200 outline-none resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 pt-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>We'll respond within 24 hours</span>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center bg-teal-50 rounded-2xl p-8 border border-teal-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Ready to Transform Your Career?
          </h3>
          <p className="text-gray-600 mb-6">
            Schedule a call with our admissions team to learn more about our programs
          </p>
          <a
            href="/sign-up"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-teal-500/30"
          >
            Enroll Now
            <CheckCircle2 className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}