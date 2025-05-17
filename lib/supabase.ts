import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database.types"

// Create a single supabase client for server-side usage
export const createServerClient = () => {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
}

// Create a singleton for client-side usage to prevent multiple instances
let clientSingleton: ReturnType<typeof createBrowserClient> | null = null

export const createBrowserClient = () => {
  const client = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  return client
}

export const getBrowserClient = () => {
  if (!clientSingleton) {
    clientSingleton = createBrowserClient()
  }
  return clientSingleton
}
