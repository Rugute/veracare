// About.jsx
import React from "react";

const teamMembers = [
    { name: "Jane Doe", role: "Founder & CEO" },
    { name: "John Smith", role: "Director of Training" },
    // Add more members as needed
];

const About = () => {
    return (

        <section id="about" className="py-20 bg-gray-50">

            <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h2>
                <p>
                    VeraCare Health Academy is committed to providing top-notch healthcare
                    training and resources, empowering professionals with the knowledge and tools
                    needed to improve patient outcomes.
                </p>
            </section>

            {/* Vision */}
            <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Vision</h2>
                <p>
                    To be a leading institution in healthcare education, fostering innovation,
                    professionalism, and community impact across Africa and beyond.
                </p>
            </section>

            {/* Team */}
            <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-gray-600">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact */}
            <section>
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Contact Us</h2>
                <p>Email: info@veracarehealthacademy.com</p>
                <p>Phone: +254 700 000 000</p>
            </section>
        </section>

    );
};

export default About;
