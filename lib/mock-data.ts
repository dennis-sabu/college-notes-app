import type { Note } from "@/types/note"

// Generate a set of mock notes for the template
export const generateMockNotes = (): Note[] => {
  const subjects = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Engineering",
    "Business",
    "Economics",
  ]

  const semesters = ["1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester"]

  const teachers = [
    { id: "teacher1", name: "Dr. Smith" },
    { id: "teacher2", name: "Prof. Johnson" },
    { id: "teacher3", name: "Dr. Williams" },
    { id: "teacher4", name: "Prof. Brown" },
  ]

  const notes: Note[] = []

  // Generate 20 mock notes
  for (let i = 1; i <= 20; i++) {
    const subject = subjects[Math.floor(Math.random() * subjects.length)]
    const semester = semesters[Math.floor(Math.random() * semesters.length)]
    const teacher = teachers[Math.floor(Math.random() * teachers.length)]
    const downloads = Math.floor(Math.random() * 100)

    // Create date between 1-30 days ago
    const daysAgo = Math.floor(Math.random() * 30) + 1
    const date = new Date()
    date.setDate(date.getDate() - daysAgo)

    notes.push({
      id: `note-${i}`,
      title: `${subject} Notes ${i}`,
      description: `Comprehensive notes on ${subject} for ${semester} students. Covers all major topics and includes practice problems.`,
      subject,
      semester,
      fileURL: "#",
      fileName: `${subject.toLowerCase().replace(/\s+/g, "-")}-notes-${i}.pdf`,
      fileType: "application/pdf",
      fileSize: Math.floor(Math.random() * 5000000) + 500000, // 500KB to 5MB
      teacherId: teacher.id,
      teacherName: teacher.name,
      createdAt: date.toISOString(),
      downloads,
    })
  }

  return notes
}

// Mock notes data
export const mockNotes = generateMockNotes()

// Helper function to get notes by teacher ID
export const getNotesByTeacher = (teacherId: string): Note[] => {
  return mockNotes.filter((note) => note.teacherId === teacherId)
}

// Helper function to get recent notes
export const getRecentNotes = (limit = 5): Note[] => {
  return [...mockNotes]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

// Helper function to get popular notes
export const getPopularNotes = (limit = 5): Note[] => {
  return [...mockNotes].sort((a, b) => b.downloads - a.downloads).slice(0, limit)
}

// Helper function to search and filter notes
export const searchAndFilterNotes = (query = "", subject = "", semester = ""): Note[] => {
  let filtered = [...mockNotes]

  if (query) {
    const lowercaseQuery = query.toLowerCase()
    filtered = filtered.filter(
      (note) =>
        note.title.toLowerCase().includes(lowercaseQuery) ||
        note.description.toLowerCase().includes(lowercaseQuery) ||
        note.teacherName.toLowerCase().includes(lowercaseQuery),
    )
  }

  if (subject && subject !== "all") {
    filtered = filtered.filter((note) => note.subject === subject)
  }

  if (semester && semester !== "all") {
    filtered = filtered.filter((note) => note.semester === semester)
  }

  return filtered
}
