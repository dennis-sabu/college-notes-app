import Link from "next/link"
import { FileText, Download, Calendar, User } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Note } from "@/types/note"

interface NotesListProps {
  notes: Note[]
}

export function NotesList({ notes }: NotesListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Card key={note.id} className="flex flex-col">
          <CardContent className="flex-1 pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{note.title}</h3>
              </div>
              <Badge variant="outline">{note.subject}</Badge>
            </div>
            <div className="mt-2 line-clamp-2 text-sm text-muted-foreground">{note.description}</div>
            <div className="mt-4 flex flex-col space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center">
                <User className="mr-1 h-3 w-3" />
                <span>{note.teacherName}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Download className="mr-1 h-3 w-3" />
                <span>{note.downloads || 0} downloads</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Link href={`/notes/${note.id}`} className="w-full">
              <Button variant="outline" className="w-full">
                View Notes
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
