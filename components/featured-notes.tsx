"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Sample featured notes data
const featuredNotes = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    description: "Comprehensive notes covering all topics in KTU CS203 syllabus",
    semester: 3,
    branch: "CSE",
    downloads: 1245,
    rating: 4.8,
    author: "Prof. Rajesh Kumar",
    fileType: "PDF",
  },
  {
    id: 2,
    title: "Digital Signal Processing",
    description: "Complete lecture notes with solved examples for EC302",
    semester: 5,
    branch: "ECE",
    downloads: 987,
    rating: 4.7,
    author: "Dr. Priya Menon",
    fileType: "PDF",
  },
  {
    id: 3,
    title: "Engineering Mechanics",
    description: "Study materials with diagrams and problem solutions for ME201",
    semester: 2,
    branch: "ME",
    downloads: 1532,
    rating: 4.9,
    author: "Prof. Sunil Thomas",
    fileType: "PDF",
  },
  {
    id: 4,
    title: "Circuit Theory",
    description: "Detailed notes with practice problems for EE201",
    semester: 3,
    branch: "EEE",
    downloads: 876,
    rating: 4.6,
    author: "Dr. Anitha K",
    fileType: "PDF",
  },
]

export default function FeaturedNotes() {
  return (
    <section className="my-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Featured Notes</h2>
        <Button variant="outline" asChild>
          <Link href="/browse">View All</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredNotes.map((note, index) => (
          <NoteCard key={note.id} note={note} index={index} />
        ))}
      </div>
    </section>
  )
}

function NoteCard({ note, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="mb-2">
              {note.branch} • Sem {note.semester}
            </Badge>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{note.fileType}</Badge>
          </div>
          <CardTitle className="line-clamp-1">{note.title}</CardTitle>
          <CardDescription className="line-clamp-2">{note.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <p className="text-sm text-muted-foreground">By {note.author}</p>
        </CardContent>
        <CardFooter className="flex justify-between pt-3 border-t border-border/50">
          <div className="flex items-center text-sm text-muted-foreground">
            <Download className="h-4 w-4 mr-1" />
            <span>{note.downloads}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-4 w-4 mr-1 text-yellow-500" />
            <span>{note.rating}</span>
          </div>
          <Button size="sm" variant="ghost" asChild>
            <Link href={`/browse/notes/${note.id}`}>View</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
