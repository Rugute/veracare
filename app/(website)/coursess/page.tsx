import CourseCard from '@/Website/components/CourseCard'
export default function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Courses</h1>
      <CourseCard title="First Aid / CPR" description="Emergency training" image="/cpr.jpg" />
    </div>
  )
}