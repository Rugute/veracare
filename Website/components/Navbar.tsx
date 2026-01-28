'use client'
import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="bg-white shadow px-6 py-4 flex justify-between">
            <Link href="/" className="font-bold text-blue-900">VeraCare</Link>
            <div className="space-x-4">
                <Link href="/">Home</Link>
                <Link href="/courses">Courses</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
            </div>
        </nav>
    )
}