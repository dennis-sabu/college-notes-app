"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp, Upload } from "lucide-react"
import { ktuData } from "@/lib/ktu-data"
import { useToast } from "@/hooks/use-toast"

export default function UploadPage() {
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    semester: "",
    branch: "",
    subject: "",
    fileType: "pdf",
    author: "",
  })

  // Get unique semesters and branches
  const semesters = Array.from(new Set(ktuData.subjects.map((subject) => subject.semester))).sort()
  const branches = Array.from(new Set(ktuData.subjects.map((subject) => subject.branch))).sort()

  // Filter subjects based on selected semester and branch
  const filteredSubjects = ktuData.subjects.filter((subject) => {
    const matchesSemester = !formData.semester || subject.semester.toString() === formData.semester
    const matchesBranch = !formData.branch || subject.branch === formData.branch
    return matchesSemester && matchesBranch
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.title || !formData.semester || !formData.branch || !formData.subject || !selectedFile) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and select a file.",
        variant: "destructive",
      })
      return
    }

    // Simulate upload
    setIsUploading(true)

    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Upload successful!",
        description: "Your notes have been uploaded and will be reviewed shortly.",
      })

      // Reset form
      setFormData({
        title: "",
        description: "",
        semester: "",
        branch: "",
        subject: "",
        fileType: "pdf",
        author: "",
      })
      setSelectedFile(null)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Upload Notes</h1>
            <p className="text-muted-foreground">Share your study materials with fellow KTU students</p>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Note Details</CardTitle>
                <CardDescription>Fill in the details about the notes you're uploading</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="E.g., Complete DSA Notes with Examples"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Briefly describe what these notes cover..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester *</Label>
                    <Select value={formData.semester} onValueChange={(value) => handleSelectChange("semester", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map((semester) => (
                          <SelectItem key={semester} value={semester.toString()}>
                            Semester {semester}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch *</Label>
                    <Select value={formData.branch} onValueChange={(value) => handleSelectChange("branch", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => handleSelectChange("subject", value)}
                    disabled={!formData.semester || !formData.branch}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !formData.semester || !formData.branch ? "Select semester and branch first" : "Select Subject"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredSubjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id.toString()}>
                          {subject.name} ({subject.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fileType">File Type *</Label>
                  <Select value={formData.fileType} onValueChange={(value) => handleSelectChange("fileType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select File Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="doc">DOC/DOCX</SelectItem>
                      <SelectItem value="ppt">PPT/PPTX</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Your Name (Optional)</Label>
                  <Input
                    id="author"
                    name="author"
                    placeholder="How you want to be credited"
                    value={formData.author}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file">Upload File *</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      id="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file" className="cursor-pointer flex flex-col items-center">
                      <FileUp className="h-10 w-10 text-muted-foreground mb-2" />
                      {selectedFile ? (
                        <div>
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium">Click to upload or drag and drop</p>
                          <p className="text-sm text-muted-foreground">PDF, DOC, PPT (Max 10MB)</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Notes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              By uploading notes, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Content Policy
              </a>
              .
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
