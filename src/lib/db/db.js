import { AuthApiError, createClient } from '@supabase/supabase-js';
let supabase = null;

if (!supabase) {
  supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
}

async function addParenTaskToDB(task) {
  const { data, error } = await supabase
    .from('todo_categories')
    .insert([task])
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
}

async function addChildTaskToDB(task) {
  const { data, error } = await supabase
  .from('todos')
  .insert([task])
  .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
}

async function getTasks() {
  const { data, error } =  await supabase
  .from('todo_categories')
  .select(`*, todos(*)`)

  if (error) {
    throw new Error(error);
  }
  return data;
}

async function getMaxPosition() {
  const { data, error } =  await supabase.rpc('max_position');

  if (error) {
    throw new Error(error);
  }
  return data;
}

export { addParenTaskToDB, addChildTaskToDB, getTasks, getMaxPosition }