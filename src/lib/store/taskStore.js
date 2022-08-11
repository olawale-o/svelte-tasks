import { writable } from 'svelte/store';
const localStoreTasks = JSON.parse(localStorage.getItem('tasks'));


const initialState = {
  tasks: localStoreTasks.tasks || [],
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

      const { description, id } = task;
      const parentTaskIndex = state.tasks.findIndex((task) => task.id === id);
    
      const parentTask = oldTasks[parentTaskIndex];
    
      const newTask = {
        id: Math.floor(Math.random() * 100),
        description,
        completed: false,
        parentId: id,
      };
    
      parentTask.tasks.push(newTask);
      parentTask.progressLevel = (parentTask.tasks.filter((task) => task.completed === true).length / parentTask.tasks.length) * 100;
      oldTasks[parentTaskIndex] = parentTask;
      state.tasks = oldTasks;
      subscribe((state) => localStorage.setItem('tasks', JSON.stringify(state)));
      return state;
    }),
    toggleTask: (task) => update((state) => {
      const oldTasks = [...state.tasks];
      const parentTask = oldTasks.find((item) => item.id === task.parentId);
      const completeTasks = parentTask.tasks.filter((task) => task.completed === true).length;
      parentTask.progressLevel = (completeTasks / parentTask.tasks.length) * 100;
      state.tasks = oldTasks
      subscribe((state) => localStorage.setItem('tasks', JSON.stringify(state)));
      return state;
    }),
    updateTasks: (tasks) => update((state) => {
      state.tasks = tasks;
      return state;
    }),
  }
}

export const taskStore = createTaskStore();
