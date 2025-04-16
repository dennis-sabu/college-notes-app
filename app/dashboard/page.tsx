"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { TeacherDashboard } from "@/components/dashboard/teacher-dashboard"
import { StudentDashboard } from "@/components/dashboard/student-dashboard"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function DashboardPage() {
  const { user, userRole, loading } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  // Show loading state while checking authentication
  if (loading || !isClient) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  // If user is not authenticated, don't render anything (will redirect)
  if (!user) {
    return null
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text={`Welcome back, ${user.displayName || user.email}!`} />

      {userRole === "teacher" ? <TeacherDashboard /> : <StudentDashboard />}
    </DashboardShell>
  )
}
