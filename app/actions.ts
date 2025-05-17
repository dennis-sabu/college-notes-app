"use server"

import { createServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

// Get notes with teacher information
export async function getNotes() {
  const supabase = createServerClient()

  const { data: notes, error } = await supabase
    .from("notes")
    .select(`
      *,
      users:teacher_id (
        full_name
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching notes:", error)
    return { notes: [], error }
  }

  // Format the notes to include teacher_name
  const formattedNotes = notes.map((note) => ({
    ...note,
    teacher_name: note.users?.full_name || "Unknown Teacher",
  }))

  return { notes: formattedNotes, error: null }
}

// Get recent notes
export async function getRecentNotes(limit = 5) {
  const supabase = createServerClient()

  const { data: notes, error } = await supabase
    .from("notes")
    .select(`
      *,
      users:teacher_id (
        full_name
      )
    `)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching recent notes:", error)
    return { notes: [], error }
  }

  // Format the notes to include teacher_name
  const formattedNotes = notes.map((note) => ({
    ...note,
    teacher_name: note.users?.full_name || "Unknown Teacher",
  }))

  return { notes: formattedNotes, error: null }
}

// Get popular notes
export async function getPopularNotes(limit = 5) {
  const supabase = createServerClient()

  const { data: notes, error } = await supabase
    .from("notes")
    .select(`
      *,
      users:teacher_id (
        full_name
      )
    `)
    .order("downloads", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching popular notes:", error)
    return { notes: [], error }
  }

  // Format the notes to include teacher_name
  const formattedNotes = notes.map((note) => ({
    ...note,
    teacher_name: note.users?.full_name || "Unknown Teacher",
  }))

  return { notes: formattedNotes, error: null }
}

// Get notes by teacher
export async function getNotesByTeacher(teacherId: string) {
  const supabase = createServerClient()

  const { data: notes, error } = await supabase
    .from("notes")
    .select(`
      *,
      users:teacher_id (
        full_name
      )
    `)
    .eq("teacher_id", teacherId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching teacher notes:", error)
    return { notes: [], error }
  }

  // Format the notes to include teacher_name
  const formattedNotes = notes.map((note) => ({
    ...note,
    teacher_name: note.users?.full_name || "Unknown Teacher",
  }))

  return { notes: formattedNotes, error: null }
}

// Search and filter notes
export async function searchNotes(query = "", subject = "", semester = "") {
  const supabase = createServerClient()

  let queryBuilder = supabase.from("notes").select(`
      *,
      users:teacher_id (
        full_name
      )
    `)

  // Add search condition if query is provided
  if (query) {
    queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`)
  }

  // Add subject filter if provided
  if (subject && subject !== "all") {
    queryBuilder = queryBuilder.eq("subject", subject)
  }

  // Add semester filter if provided
  if (semester && semester !== "all") {
    queryBuilder = queryBuilder.eq("semester", semester)
  }

  const { data: notes, error } = await queryBuilder.order("created_at", { ascending: false })

  if (error) {
    console.error("Error searching notes:", error)
    return { notes: [], error }
  }

  // Format the notes to include teacher_name
  const formattedNotes = notes.map((note) => ({
    ...note,
    teacher_name: note.users?.full_name || "Unknown Teacher",
  }))

  return { notes: formattedNotes, error: null }
}

// Increment download count
export async function incrementDownload(noteId: string) {
  const supabase = createServerClient()

  const { error } = await supabase
    .from("notes")
    .update({ downloads: supabase.rpc("increment", { x: 1 }) })
    .eq("id", noteId)

  if (error) {
    console.error("Error incrementing download count:", error)
    return { success: false, error }
  }

  return { success: true, error: null }
}

// Create a new note
export async function createNote(formData: FormData) {
  const supabase = createServerClient()

  // Get the current user session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return { success: false, error: "Not authenticated" }
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const subject = formData.get("subject") as string
  const semester = formData.get("semester") as string
  const file = formData.get("file") as File

  if (!title || !subject || !semester || !file) {
    return { success: false, error: "Missing required fields" }
  }

  // Upload file to Supabase Storage
  const fileExt = file.name.split(".").pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
  const filePath = `notes/${session.user.id}/${fileName}`

  const { error: uploadError } = await supabase.storage.from("notes").upload(filePath, file)

  if (uploadError) {
    console.error("Error uploading file:", uploadError)
    return { success: false, error: uploadError }
  }

  // Get the public URL for the uploaded file
  const {
    data: { publicUrl },
  } = supabase.storage.from("notes").getPublicUrl(filePath)

  // Insert note record in the database
  const { error: insertError } = await supabase.from("notes").insert({
    title,
    description,
    subject,
    semester,
    file_url: publicUrl,
    file_name: file.name,
    file_type: file.type,
    file_size: file.size,
    teacher_id: session.user.id,
  })

  if (insertError) {
    console.error("Error creating note:", insertError)
    return { success: false, error: insertError }
  }

  revalidatePath("/dashboard")
  revalidatePath("/browse")

  return { success: true, error: null }
}

// Delete a note
export async function deleteNote(noteId: string) {
  const supabase = createServerClient()

  // Get the current user session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return { success: false, error: "Not authenticated" }
  }

  // Get the note to find the file path
  const { data: note } = await supabase.from("notes").select("file_url").eq("id", noteId).single()

  if (note) {
    // Extract the file path from the URL
    const fileUrl = note.file_url
    const filePath = fileUrl.split("/").slice(-2).join("/")

    // Delete the file from storage
    await supabase.storage.from("notes").remove([filePath])
  }

  // Delete the note record
  const { error } = await supabase.from("notes").delete().eq("id", noteId)

  if (error) {
    console.error("Error deleting note:", error)
    return { success: false, error }
  }

  revalidatePath("/dashboard")
  revalidatePath("/browse")

  return { success: true, error: null }
}
