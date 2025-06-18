"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, FileText, Upload, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">About College Notes</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A community-driven platform for KTU engineering students to access and share study materials
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                College Notes was created with a simple mission: to make quality study materials accessible to all KTU
                engineering students, regardless of their branch or semester.
              </p>
              <p className="mb-4">
                We believe in the power of knowledge sharing and collaborative learning. By providing a platform where
                students and teachers can share their notes, presentations, and study materials, we aim to create a
                comprehensive resource that helps students excel in their academic journey.
              </p>
              <p>
                Our platform is built by students, for students, with the goal of making education more accessible,
                collaborative, and effective.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <StatCard
            icon={<FileText className="h-10 w-10 text-primary" />}
            title="1,200+"
            description="Study Materials"
          />
          <StatCard icon={<Users className="h-10 w-10 text-primary" />} title="5,000+" description="Active Users" />
          <StatCard icon={<Download className="h-10 w-10 text-primary" />} title="25,000+" description="Downloads" />
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Me</h2>
            <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <TeamMember
              name="Dennis Sabu"
              role="Founder & Developer"
              branch="Electronics & Computer Engineering"
              image="/placeholder.svg?height=100&width=100"
              />
            </div>
            </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HowItWorksCard
              step="1"
              title="Browse"
              description="Search and browse through our extensive collection of notes, organized by semester, branch, and subject."
              icon={<BookOpen className="h-10 w-10 text-primary" />}
            />
            <HowItWorksCard
              step="2"
              title="Download"
              description="Download the materials you need for your studies, completely free of charge."
              icon={<Download className="h-10 w-10 text-primary" />}
            />
            <HowItWorksCard
              step="3"
              title="Contribute"
              description="Share your own notes and materials to help fellow students and earn recognition."
              icon={<Upload className="h-10 w-10 text-primary" />}
            />
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FaqCard
              question="Is College Notes completely free to use?"
              answer="Yes, College Notes is completely free for all KTU students. We believe in making education accessible to everyone."
            />
            <FaqCard
              question="How can I contribute my notes?"
              answer="You can easily upload your notes through our 'Upload' page. Simply fill in the details about your notes and upload the file. Your contribution will be reviewed and made available to other students."
            />
            <FaqCard
              question="Are the notes verified for accuracy?"
              answer="We have a review process for all uploaded materials. However, we always recommend cross-referencing with official KTU syllabus and materials."
            />
            <FaqCard
              question="Can I request specific notes or materials?"
              answer="Yes, you can request specific materials through our contact page. We'll try our best to find and make them available."
            />
            <FaqCard
              question="How can I report incorrect or outdated materials?"
              answer="You can report any issues with the materials through the 'Report' button available on each note's page or by contacting us directly."
            />
          </div>
        </motion.section>
      </div>
    </div>
  )
}

function StatCard({ icon, title, description }) {
  return (
    <Card className="text-center">
      <CardHeader className="pb-2 flex justify-center">
        <div className="mb-2">{icon}</div>
      </CardHeader>
      <CardContent>
        <h3 className="text-3xl font-bold mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function TeamMember({ name, role, branch, image }) {
  return (
    <Card className="text-center">
      <CardHeader className="pb-2">
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={image || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{role}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="outline">{branch}</Badge>
      </CardContent>
    </Card>
  )
}

function HowItWorksCard({ step, title, description, icon }) {
  return (
    <Card className="text-center">
      <CardHeader className="pb-2">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">{icon}</div>
        </div>
        <div className="mb-2">
          <Badge variant="outline">Step {step}</Badge>
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function FaqCard({ question, answer }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{answer}</p>
      </CardContent>
    </Card>
  )
}
