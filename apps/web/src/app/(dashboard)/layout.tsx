import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function DashboardLayout({
    children,
}: {
    children: React.Node
}) {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-indigo-600">SHP</h1>
                    <p className="text-sm text-gray-600">School Health Platform</p>
                </div>

                <nav className="mt-6">
                    <Link
                        href="/dashboard"
                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </Link>

                    <Link
                        href="/dashboard/teachers"
                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Teachers
                    </Link>

                    <Link
                        href="/dashboard/events"
                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Events
                    </Link>

                    <Link
                        href="/dashboard/students"
                        className="flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Students
                    </Link>
                </nav>

                <div className="absolute bottom-0 w-64 p-6">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                            {session.user?.name?.[0] || "U"}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">{session.user?.name}</p>
                            <p className="text-xs text-gray-500">{session.user?.role}</p>
                        </div>
                    </div>
                    <form
                        action={async () => {
                            "use server"
                            await signOut()
                        }}
                    >
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        >
                            Sign out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white shadow-sm">
                    <div className="px-8 py-4">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Welcome back, {session.user?.name}
                        </h2>
                    </div>
                </header>

                <div className="p-8">{children}</div>
            </main>
        </div>
    )
}
