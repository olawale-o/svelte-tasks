// import.meta.env.VITE_SUPABASE_CONNECTION_STRING
import { AuthApiError, createClient } from '@supabase/supabase-js';
let supabase = null;

if (!supabase) {
  supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
}

async function addParenTaskToDB(task) {
  const { error } = await supabase
    .from('todo_categories')
    .insert([task]);
  if (error) {
    throw new Error(error.message);
  }
  return true;
}

export { addParenTaskToDB }