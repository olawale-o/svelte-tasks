<script>
  import { createEventDispatcher } from 'svelte';
  import { taskStore } from '../store/taskStore';
  import AddTask from './New.svelte';
  import TaskCard from './index.svelte';
  import { capitalize } from './utils';
  export let todo;
  export let id;
  export let active;
  let open = false;
  let dragItem = null;
  let dragEnterItem = null;
  let dragEl = null;
  const dispatch = createEventDispatcher();
  function toggleTask() {
    open = !open;
    dispatch('toggleTask',  { id });
  }

  function start(e) {
    dragItem = e.detail.start;
    dragEl = e.detail.el;
    console.log(e.detail.el)
  }

  function enter(e) {
    dragEnterItem = e.detail.enter;
  }

  $:tasks = $taskStore.tasks;
  
  function end(e) {
    let _tasks = [...tasks];

    let _parentTask = _tasks[id];

    const dragItemContent = _parentTask.tasks.splice(dragItem, 1)[0];

    _parentTask.tasks.splice(dragEnterItem, 0, dragItemContent);

    _tasks[id] = _parentTask;

    dragItem = null;
    dragEnterItem = null;
    taskStore.updateTasks(_tasks);
  }

</script>
<div class="task-container">
  <button class="task-heading" on:click={toggleTask}>
    <span class="task-title">{capitalize(todo.title)}</span>
  </button>
  <div class="progress">
    <div class="progress-level" style="height: 100%; width: {todo.progress_level+'%'};"></div>
  </div>
  <ul class="todo-tasks" id="todo-tasks" class:open={active}>
    <AddTask placeholder={capitalize(todo.title)} parentId={todo.id} />
    {#if todo?.task}
      {#each todo.tasks as task, key}
        <TaskCard
          {task}
          id={key}
          on:start={start}
          on:enter={enter}
          on:end={end}
        />
      {/each}
    {:else}
      <p>No todos under this task</p>
    {/if}
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