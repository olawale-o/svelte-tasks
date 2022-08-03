<script>
  import { taskStore } from './lib/store/taskStore';
  import TaskList from './lib/Task/List.svelte';
  let currentActiveIndex = 0;
  $: {  }

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
  $: tasks = $taskStore.tasks;
</script>

<main>
  <div class="todo-container">
    <div class="todo-content">
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
