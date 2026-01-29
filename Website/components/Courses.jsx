import React from "react";

const courses = [
  { title: "Health Management", description: "Learn management of healthcare facilities." },
  { title: "Nursing", description: "Upgrade your skills with our nursing programs." },
  { title: "Medical Technology", description: "Advanced training in medical tech." },
  { title: "First Aid Training", description: "Learn to handle emergencies efficiently." },
];

export default function Courses() {
  return (
    <section id="courses" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="bg-sky-100 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-700">{course.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
