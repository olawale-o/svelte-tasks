import { writable } from 'svelte/store';
import { getTasks } from '../db/db';
const localStoreTasks = JSON.parse(localStorage.getItem('tasks'));


const initialState = {
  tasks: localStoreTasks?.tasks || [],
};

function createTaskStore(state = []) {
  const { subscribe, update, set } = writable(state);

  return {
    subscribe,
    getAllTasks: async () => {
      try {
        const data = await getTasks();
        set(data);
        subscribe((state) => localStorage.setItem('tasks', JSON.stringify(state)));
      } catch (err) {
        set([]);
      }
    },
    addParentTask: (task) => update((state) => {
      state.push(task);
      subscribe((state) => localStorage.setItem('tasks', JSON.stringify(state)));
      return state;
    }),
    addTask: (task) => update((state) => {
      const oldTasks = [...state];

      const { description, parent_id, completed, id } = task;
      const parentTaskIndex = state.findIndex((task) => task.id === parent_id);
    
      const parentTask = oldTasks[parentTaskIndex];
      const newTask = {
        id,
        description,
        completed,
        parent_id,
      };
      parentTask.todos.push(newTask);
      parentTask.progress_level = (parentTask.todos.filter((task) => task.completed === true).length / parentTask.todos.length) * 100;
      oldTasks[parentTaskIndex] = parentTask;
      state = oldTasks;
      subscribe((state) => localStorage.setItem('tasks', JSON.stringify(state)));
      return state;
    }),
    toggleTask: (task) => update((state) => {
      const oldTasks = [...state];
      const parentTask = oldTasks.find((item) => item.id === task.parentId);
      const completeTasks = parentTask.todos.filter((task) => task.completed === true).length;
      parentTask.progress_level = (completeTasks / parentTask.todos.length) * 100;
      state = oldTasks
      subscribe((state) => localStorage.setItem('tasks', JSON.stringify(state)));
      return state;
    }),
    updateTasks: (tasks) => update((state) => {
      state = tasks;
      subscribe((state) => localStorage.setItem('tasks', JSON.stringify(state)))
      return state;
    }),
  }
}

export const taskStore = createTaskStore();
