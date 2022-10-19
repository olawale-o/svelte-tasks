import { writable } from 'svelte/store';

const localStoreTasks = JSON.parse(localStorage.getItem('tasks'));

const initialState = {
  tasks: localStoreTasks?.tasks || [],
};

function createTaskStore(state = initialState) {
  const { subscribe, update, set } = writable(state);

  return {
    subscribe,
    addParentTask: (task) => update((state) => {
      state.tasks.push(task);
      subscribe((state) => localStorage.setItem('tasks', JSON.stringify(state)));
      return state;
    }),
    addTask: (task) => update((state) => {
      const oldTasks = [...state.tasks];

      const { description, parent_id, completed, id } = task;
      const parentTaskIndex = state.tasks.findIndex((task) => task.id === parent_id);
    
      const parentTask = oldTasks[parentTaskIndex];
      const newTask = {
        id,
        description,
        completed,
        parent_id,
      };
      parentTask.tasks.push(newTask);
      parentTask.progress_level = (parentTask.tasks.filter((task) => task.completed === true).length / parentTask.tasks.length) * 100;
      oldTasks[parentTaskIndex] = parentTask;
      state.tasks = oldTasks;
      subscribe((state) => localStorage.setItem('tasks', JSON.stringify(state)));
      return state;
    }),
    toggleTask: (task) => update((state) => {
      const oldTasks = [...state.tasks];
      const parentTask = oldTasks.find((item) => item.id === task.parentId);
      const completeTasks = parentTask.tasks.filter((task) => task.completed === true).length;
      parentTask.progress_level = (completeTasks / parentTask.tasks.length) * 100;
      state.tasks = oldTasks
      subscribe((state) => localStorage.setItem('tasks', JSON.stringify(state)));
      return state;
    }),
    updateTasks: (tasks) => update((state) => {
      state.tasks = tasks;
      subscribe((state) => localStorage.setItem('tasks', JSON.stringify(state)))
      return state;
    }),
  }
}

export const taskStore = createTaskStore();
