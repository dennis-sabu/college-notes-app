"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getNotesByTeacher, deleteNote } from "@/app/actions"
import type { Note } from "@/types/note"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function UploadsPage() {
  const { user } = useAuth()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return

      try {
        const { notes } = await getNotesByTeacher(user.id)
        setNotes(notes)
      } catch (error) {
        console.error("Error fetching notes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [user])

  const handleDelete = async (noteId: string) => {
    try {
      const { success, error } = await deleteNote(noteId)

      if (success) {
        setNotes(notes.filter((note) => note.id !== noteId))
        toast({
          title: "Note deleted",
          description: "The note has been deleted successfully.",
        })
      } else {
        toast({
          title: "Delete failed",
          description: typeof error === "object" && error && "message" in error
            ? (error as { message: string }).message
            : (typeof error === "string" ? error : "Failed to delete note. Please try again."),
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Delete failed",
        description: error.message || "Failed to delete note. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="My Uploads" text="Manage your uploaded notes." />
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="My Uploads" text="Manage your uploaded notes." />

      {notes.length > 0 ? (
        <div className="grid gap-6">
          {notes.map((note) => (
            <div key={note.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{note.title}</h3>
                  <p className="text-sm text-muted-foreground">{note.description}</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" onClick={() => setNoteToDelete(note.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the note and remove it from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(note.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Subject:</span> {note.subject}
                </div>
                <div>
                  <span className="font-medium">Semester:</span> {note.semester}
                </div>
                <div>
                  <span className="font-medium">Uploaded:</span> {new Date(note.created_at).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Downloads:</span> {note.downloads}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No notes uploaded yet</h3>
          <p className="text-muted-foreground mt-1">
            Start sharing your knowledge with students by uploading your first notes.
          </p>
        </div>
      )}
    </DashboardShell>
  )
}
