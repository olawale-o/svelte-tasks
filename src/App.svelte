<script>
  import { taskStore } from './lib/store/taskStore';
  import { newTask } from './lib/Task/utils';
  import TaskList from './lib/Task/List.svelte';
  let currentActiveIndex = 0;
  $: {  }
  let task = '';

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
  function addTask(e) {
    const isAdded = newTask(e, task, { title: task, id: tasks.length + 1, progressLevel: 0, tasks: []}, taskStore.addParentTask);
    if (isAdded) {
      task = '';
    }
  }
  $: tasks = $taskStore.tasks;
  console.log(taskStore.tasks)
</script>

<main>
  <div class="todo-container">
    <div class="todo-content">
      <div class="input-field">
        <input
          type="text"
          class="input"
          placeholder="Add a task"
          bind:value={task}
          on:keyup={addTask}
        >
        <span id="add"><i class='bx bx-subdirectory-left return' on:click={addTask}></i></span>
      </div>
      {#each tasks as task, id}
        <TaskList
          {task}
          active={currentActiveIndex === id}
          {id}
          on:toggleTask={toggleTask}
        />
      {/each}
    </div>
  </div>
</main>

<style>
</style>
