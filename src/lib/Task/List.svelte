<script>
  import TaskCard from './index.svelte';
  export let task;
</script>
<div class="task-container">
  <button class="task-heading">
    <span class="task-title">{task.title}</span>
    <span class="task-title">{task.progressLevel}</span>
  </button>
  <div class="progress"></div>
  <ul class="todo-tasks" id="todo-tasks">
    {#each task.tasks as task}
      <TaskCard {task} />
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
    height: 1px;
    background: green;
  }

  .task-title {
    font-size: 2rem;
  }
</style>