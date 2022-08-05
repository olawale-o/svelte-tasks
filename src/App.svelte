<script>
  import { taskStore } from './lib/store/taskStore';
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
    if ((e.key === 'Enter' || e.type === 'click') && task?.trim()) {
      taskStore.addParentTask({ title: task, id: tasks.length + 1, progressLevel: 0, tasks: [] });
      task = '';
    }
  }
  $: tasks = $taskStore.tasks;
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
