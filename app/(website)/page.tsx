import CourseCard from '@/Website/components/CourseCard'

const courses = [
  { title: 'First Aid / CPR / AED', description: 'Emergency response training', image: '/cpr.jpg' },
  { title: 'Medication Aide Level 1', description: 'Safe medication handling', image: '/med1.jpg' },
  { title: 'Certified Medication Technician', description: 'Advanced certification', image: '/cmt.jpg' },
]

export default function HomePage() {
  return (
    <div>
      <section className="bg-blue-900 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">VeraCare Health Academy</h1>
        <p className="text-lg">Empowering healthcare professionals through training</p>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-2xl font-semibold mb-8 text-center">Our Courses</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <CourseCard key={i} {...c} />
          ))}
        </div>
      </section>
    </div>
  )
}