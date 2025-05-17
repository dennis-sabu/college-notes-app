"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, FileText, Home, LogOut, Upload, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  const pathname = usePathname()
  const { userRole, signOut } = useAuth()

  const isTeacher = userRole === "teacher"

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Browse Notes",
      href: "/browse",
      icon: BookOpen,
    },
    ...(isTeacher
      ? [
          {
            title: "My Uploads",
            href: "/dashboard/uploads",
            icon: FileText,
          },
          {
            title: "Upload Notes",
            href: "/dashboard/upload",
            icon: Upload,
          },
        ]
      : []),
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ]

  return (
    <nav className="grid items-start gap-2 py-4">
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent" : "transparent",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </span>
        </Link>
      ))}
      <Button variant="ghost" className="justify-start px-3 mt-auto" onClick={() => signOut()}>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </Button>
    </nav>
  )
}
