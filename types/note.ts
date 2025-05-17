export interface Note {
  id: string
  title: string
  description: string | null
  subject: string
  semester: string
  file_url: string
  file_name: string
  file_type: string
  file_size: number
  teacher_id: string
  teacher_name?: string // This will be populated from the users table
  created_at: string
  downloads: number
}
