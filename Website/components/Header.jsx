import React from "react";

export default function Header() {
    return (
        <header className="bg-white shadow-md fixed w-full z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-sky-600">Veracare Health Academy</h1>
                <nav className="space-x-6 hidden md:flex">
                    <a href="/" className="text-gray-700 hover:text-sky-600">Home</a>
                    <a href="#about" className="text-gray-700 hover:text-sky-600">About</a>
                    <a href="#courses" className="text-gray-700 hover:text-sky-600">Courses</a>
                    <a href="#events-calendar" className="text-gray-700 hover:text-sky-600">Events/Calendar</a>
                    <a href="#testimonials" className="text-gray-700 hover:text-sky-600">Testimonials</a>
                    <a href="#contact" className="text-gray-700 hover:text-sky-600">Contact</a>
                </nav>
            </div>
        </header>
    );
}
