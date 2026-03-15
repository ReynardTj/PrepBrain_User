import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error(
//     'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.\n' +
//     'Create a .env file in your project root with these values.'
//   )
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  // {
  //   auth: {
  //     storage: window.localStorage,
  //     autoRefreshToken: true,
  //     persistSession: true,
  //     detectSessionInUrl: true,
  //   },
  // }
)
