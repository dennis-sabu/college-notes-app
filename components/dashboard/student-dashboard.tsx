"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { NotesList } from "@/components/notes/notes-list"
import { getRecentNotes, getPopularNotes } from "@/lib/mock-data"
import type { Note } from "@/types/note"

export function StudentDashboard() {
  const [recentNotes, setRecentNotes] = useState<Note[]>([])
  const [popularNotes, setPopularNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Use mock data instead of Firebase
        const recentData = getRecentNotes(5)
        const popularData = getPopularNotes(5)

        setRecentNotes(recentData)
        setPopularNotes(popularData)
      } catch (error) {
        console.error("Error fetching notes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="grid gap-6">
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Welcome to College Notes Hub</CardTitle>
          <CardDescription>
            Find and download notes from your professors and peers to help with your studies.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href="/browse">
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Browse All Notes
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <div className="grid gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Recently Added Notes</h2>
          {recentNotes.length > 0 ? (
            <NotesList notes={recentNotes} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No notes available yet.</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Popular Notes</h2>
          {popularNotes.length > 0 ? (
            <NotesList notes={popularNotes} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No popular notes available yet.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
