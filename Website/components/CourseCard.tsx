export default function CourseCard({ title, description, image }: any) {
  return (
    <div className="border rounded-lg overflow-hidden shadow">
      <img src={image} alt={title} className="h-40 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <button className="mt-4 bg-blue-900 text-white px-4 py-2">Enroll</button>
      </div>
    </div>
  )
}