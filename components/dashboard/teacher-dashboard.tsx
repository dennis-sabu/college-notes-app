"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Upload, Clock } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { NotesList } from "@/components/notes/notes-list"
import { getNotesByTeacher } from "@/app/actions"
import type { Note } from "@/types/note"
import { useAuth } from "@/components/auth-provider"

export function TeacherDashboard() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalNotes: 0,
    totalDownloads: 0,
    recentUploads: 0,
  })
  const { user } = useAuth()

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return

      try {
        const { notes } = await getNotesByTeacher(user.id)
        setNotes(notes)

        // Calculate stats
        setStats({
          totalNotes: notes.length,
          totalDownloads: notes.reduce((acc, note) => acc + (note.downloads || 0), 0),
          recentUploads: notes.filter((note) => {
            const uploadDate = new Date(note.created_at)
            const oneWeekAgo = new Date()
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
            return uploadDate >= oneWeekAgo
          }).length,
        })
      } catch (error) {
        console.error("Error fetching notes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [user])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalNotes}</div>
            <p className="text-xs text-muted-foreground">Notes uploaded by you</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDownloads}</div>
            <p className="text-xs text-muted-foreground">Times your notes have been downloaded</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentUploads}</div>
            <p className="text-xs text-muted-foreground">Notes uploaded in the last 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Recent Notes</h2>
          <Link href="/dashboard/upload">
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload New Notes
            </Button>
          </Link>
        </div>

        {notes.length > 0 ? (
          <NotesList notes={notes.slice(0, 5)} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No notes uploaded yet</CardTitle>
              <CardDescription>
                Start sharing your knowledge with students by uploading your first notes.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/dashboard/upload">
                <Button>Upload Your First Notes</Button>
              </Link>
            </CardFooter>
          </Card>
        )}

        {notes.length > 5 && (
          <div className="flex justify-center">
            <Link href="/dashboard/uploads">
              <Button variant="outline">View All Notes</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
