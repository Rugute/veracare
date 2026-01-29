import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Name" className="p-3 rounded border border-gray-300" />
          <input type="email" placeholder="Email" className="p-3 rounded border border-gray-300" />
          <textarea placeholder="Message" rows="4" className="p-3 rounded border border-gray-300"></textarea>
          <button className="bg-sky-600 text-white p-3 rounded hover:bg-sky-700 transition">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
