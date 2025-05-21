"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function HeroSection() {
  return (
    <section className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            KTU Engineering Notes
          </h1>
          <p className="text-xl mb-8 text-muted-foreground max-w-lg">
            Access comprehensive study materials for all semesters and branches. Created by students, for students.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/browse">Browse Notes</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/upload">Contribute</Link>
            </Button>
          </div>

          <div className="mt-8 relative">
            <div className="flex">
              <Input placeholder="Search for subjects, notes, or materials..." className="rounded-r-none h-12 pl-12" />
              <Button className="rounded-l-none">Search</Button>
            </div>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10">
            <img src="/home.png?height=400&width=600" alt="Students studying" className="rounded-lg shadow-xl" />
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  )
}
