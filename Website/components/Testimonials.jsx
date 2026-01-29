import React from "react";

const testimonials = [
  { name: "Jane Doe", feedback: "Amazing courses, really improved my career!" },
  { name: "John Smith", feedback: "Highly recommend Veracare Academy." },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">What Our Students Say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="text-gray-700 mb-4">"{t.feedback}"</p>
              <h3 className="font-semibold text-gray-800">{t.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
