<script>
  import { setContext } from 'svelte';
  import TaskList from './lib/Task/List.svelte';
  let currentActiveIndex = 0;
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

  $: {
    console.log(tasks);
  }

  /**
   * @param {{ detail: { task: { id: number; description: string; completed: boolean; parentId: number }; }; }} e
  */
  function onTaskCheck(e) {
    const oldTasks = [...tasks];
    const parentTask = oldTasks.find((task) => task.id === e.detail.task.parentId);
    const completeTasks = parentTask.tasks.filter((task) => task.completed === true).length;
    parentTask.progressLevel = (completeTasks / parentTask.tasks.length) * 100;
    tasks = oldTasks;
  }

  function addTask(e) {
    const oldTasks = [...tasks];

    const { description, id } = e.detail;
    const parentTaskIndex = tasks.findIndex((task) => task.id === id);

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
    tasks = oldTasks;
  }

  /**
* @param {{ detail: { id: number; }; }} e
*/
  function toggleTask(e) {
    if (currentActiveIndex === e.detail.id) {
      currentActiveIndex = null;
    } else {
      currentActiveIndex = e.detail.id;
    }
  }
  setContext('nameContext', {
    name: 'Svelte',
    updateName(){
      this.name = 'Angular'
    }
  });
</script>

<main>
  <div class="todo-container">
    <div class="todo-content">
      {#each tasks as task, id}
        <TaskList
          on:checkedTask={onTaskCheck}
          {task}
          active={currentActiveIndex === id}
          {id}
          on:toggleTask={toggleTask}
          on:addTask={addTask}
        />
      {/each}
    </div>
  </div>
</main>

<style>
</style>
