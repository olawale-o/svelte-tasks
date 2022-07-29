<script>
  import { createEventDispatcher } from 'svelte';
  import AddTask from './New.svelte';
  import TaskCard from './index.svelte';
  export let task;
  export let id;
  export let active;
  let open = false;
  const dispatch = createEventDispatcher();
  function toggleTask() {
    open = !open;
    dispatch('toggleTask',  { id });
  }

  function addTask(e) {
    console.log(e.detail.description);
    console.log(e.detail.parentId);
  }
</script>
<div class="task-container">
  <button class="task-heading" on:click={toggleTask}>
    <span class="task-title">{task.title}</span>
  </button>
  <div class="progress">
    <div class="progress-level" style="height: 100%; width: {task.progressLevel+'%'};"></div>
  </div>
  <ul class="todo-tasks" id="todo-tasks" class:open={active}>
    <AddTask on:addTask={addTask} parentId={task.id} />
    {#each task.tasks as task}
      <TaskCard on:checkedTask {task} />
    {/each}
  </ul>
</div>

<style>
  .task-heading {
    background: #fff;
    padding: 15px;
    border: none;
    outline: none;
    display: block;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }

  .progress {
    widows: 100%;
    height: 2px;
  }

  .progress-level {
    background: green;
    transition: all 300ms ease;
  }

  .task-title {
    font-size: 2rem;
  }

  .todo-tasks {
    overflow-y: auto;
    max-height: 0px;
    padding: 0;
    transition: all 300ms ease-in-out;
  }

  .todo-tasks.open {
    max-height: initial;
    transition: all 300ms ease-in-out;
  }
</style>