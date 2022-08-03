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

export const count = writable(tasks);
