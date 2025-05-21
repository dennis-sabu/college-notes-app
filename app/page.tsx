"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Upload, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import HeroSection from "@/components/hero-section"
import FeaturedNotes from "@/components/featured-notes"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      {/* Features Section */}
      <section className="my-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need For Your Studies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access comprehensive study materials for all KTU engineering branches and semesters in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BookOpen className="h-10 w-10" />}
            title="Comprehensive Notes"
            description="Access notes for all 8 semesters across all engineering branches under KTU syllabus."
            link="/browse"
            linkText="Browse Notes"
          />
          <FeatureCard
            icon={<Upload className="h-10 w-10" />}
            title="Contribute Materials"
            description="Share your notes, presentations, and study materials with fellow students."
            link="/upload"
            linkText="Upload Notes"
          />
          <FeatureCard
            icon={<Users className="h-10 w-10" />}
            title="Community Driven"
            description="Join a community of students and teachers sharing knowledge and resources."
            link="/about"
            linkText="Learn More"
          />
        </div>
      </section>

      {/* Featured Notes Section */}
      <FeaturedNotes />

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-20 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-white/10"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Exams?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of KTU students who are already using College Notes to excel in their studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/browse">Start Browsing</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/upload">Contribute Notes</Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

function FeatureCard({ icon, title, description, link, linkText }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader>
          <div className="mb-4 text-primary">{icon}</div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="ghost" className="group" asChild>
            <Link href={link}>
              {linkText} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
