"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getBrowserClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, User, ArrowLeft } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { incrementDownload } from "@/app/actions"
import type { Note } from "@/types/note"

export default function NoteDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = getBrowserClient()

  useEffect(() => {
    const fetchNote = async () => {
      if (!params.id) return

      try {
        const { data, error } = await supabase
          .from("notes")
          .select(`
            *,
            users:teacher_id (
              full_name
            )
          `)
          .eq("id", params.id)
          .single()

        if (error) {
          console.error("Error fetching note:", error)
          return
        }

        if (data) {
          setNote({
            ...data,
            teacher_name: data.users?.full_name || "Unknown Teacher",
          })
        }
      } catch (error) {
        console.error("Error fetching note:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [params.id])

  const handleDownload = async () => {
    if (!note) return

    // Increment download count
    await incrementDownload(note.id)

    // Open the file URL in a new tab
    window.open(note.file_url, "_blank")
  }

  if (loading) {
    return (
      <div className="container py-10">
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="container py-10">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Note not found.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.back()} variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{note.title}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Note Details</CardTitle>
                <Badge variant="outline">{note.subject}</Badge>
              </div>
              <CardDescription>Uploaded on {new Date(note.created_at).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{note.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Subject</h3>
                  <p className="text-muted-foreground">{note.subject}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Semester</h3>
                  <p className="text-muted-foreground">{note.semester}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-1">File</h3>
                <div className="flex items-center text-muted-foreground">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>{note.file_name}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Notes
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Uploaded By</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                <span className="font-medium">{note.teacher_name}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                <span>{new Date(note.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Download className="mr-2 h-5 w-5 text-primary" />
                <span>{note.downloads} downloads</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
