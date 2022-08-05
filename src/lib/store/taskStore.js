import { writable } from 'svelte/store';

let tasks = [
  {
    id: 1,
    title: "Deployment",
    progressLevel: 50,
    tasks: [
      {
        id: 1,
        description: "Deployment Task One",
        completed: true,
        parentId: 1,
      },
      {
        id: 2,
        description: "Deployment Task Two",
        completed: false,
        parentId: 1,
      },
    ],
  },
  {
    id: 2,
    title: "Design",
    progressLevel: 50,
    tasks: [
      {
        id: 1,
        description: "Design Task One",
        completed: false,
        parentId: 2,
      },
      {
        id: 2,
        description: "Design Task Two",
        completed: true,
        parentId: 2,
      },
    ],
  }
];

const initialState = {
  tasks,
};

function createTaskStore(state = initialState) {
  const { subscribe, update, set } = writable(state);

  return {
    subscribe,
    addParentTask: (task) => update((state) => {
      state.tasks.push(task);
      console.log(state);
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
      return state;
    }),
    toggleTask: (task) => update((state) => {
      const oldTasks = [...state.tasks];
      const parentTask = oldTasks.find((item) => item.id === task.parentId);
      const completeTasks = parentTask.tasks.filter((task) => task.completed === true).length;
      parentTask.progressLevel = (completeTasks / parentTask.tasks.length) * 100;
      tasks = oldTasks;
      return state;
    }),
    updateTasks: (tasks) => update((state) => {
      state.tasks = tasks;
      return state;
    }),
  }
}

export const taskStore = createTaskStore();
