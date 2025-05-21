"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Search } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ktuData } from "@/lib/ktu-data"

export default function BrowsePage() {
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null)
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Get unique semesters and branches
  const semesters = Array.from(new Set(ktuData.subjects.map((subject) => subject.semester))).sort()
  const branches = Array.from(new Set(ktuData.subjects.map((subject) => subject.branch))).sort()

  // Filter subjects based on selections
  const filteredSubjects = ktuData.subjects.filter((subject) => {
    const matchesSemester = !selectedSemester || subject.semester.toString() === selectedSemester
    const matchesBranch = !selectedBranch || subject.branch === selectedBranch
    const matchesSearch =
      !searchQuery ||
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSemester && matchesBranch && matchesSearch
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Browse Notes</h1>
          <p className="text-muted-foreground">Find study materials for all KTU engineering branches and semesters</p>
        </div>

        <div className="w-full md:w-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search subjects, notes..."
            className="pl-10 w-full md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Filters */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Semester</label>
                <Select value={selectedSemester || ""} onValueChange={(value) => setSelectedSemester(value || null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Semesters" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    {semesters.map((semester) => (
                      <SelectItem key={semester} value={semester.toString()}>
                        Semester {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Branch</label>
                <Select value={selectedBranch || ""} onValueChange={(value) => setSelectedBranch(value || null)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Branches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSelectedSemester(null)
                    setSelectedBranch(null)
                    setSearchQuery("")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {ktuData.popularSubjects.map((subject, index) => (
                  <li key={index}>
                    <Link
                      href={`/browse?subject=${subject.code}`}
                      className="text-sm hover:text-primary transition-colors flex items-center"
                    >
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      {subject.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Subject List */}
        <div>
          <Tabs defaultValue="subjects" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="question-papers">Question Papers</TabsTrigger>
            </TabsList>

            <TabsContent value="subjects" className="space-y-6">
              {filteredSubjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSubjects.map((subject, index) => (
                    <SubjectCard key={subject.id} subject={subject} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No subjects found matching your criteria.</p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setSelectedSemester(null)
                      setSelectedBranch(null)
                      setSearchQuery("")
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="notes">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Select a subject to view available notes.</p>
              </div>
            </TabsContent>

            <TabsContent value="question-papers">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Select a subject to view previous question papers.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function SubjectCard({ subject, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/50 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge variant="outline">Sem {subject.semester}</Badge>
            <Badge>{subject.branch}</Badge>
          </div>
          <CardTitle className="mt-2">{subject.name}</CardTitle>
          <CardDescription>{subject.code}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-2">{subject.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <FileText className="h-4 w-4 mr-1" />
            <span>{subject.notesCount} Notes</span>
          </div>
          <Button size="sm" asChild>
            <Link href={`/browse/subjects/${subject.id}`}>View</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
