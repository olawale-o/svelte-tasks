<script>
  import { onMount } from 'svelte';
  import { taskStore } from '@/lib/store/taskStore';
  import { newTask } from '@/lib/Task/utils';
  import TaskList from '@/lib/Task/List.svelte';

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
  async function addTask(e) {
    if ((e.key === 'Enter' || e.type === 'click') && task?.trim()) {
      await newTask(e, {
        title: task,
        progress_level: 0,
      }, taskStore.addParentTask);
      task = '';
    }
  }

  onMount(() => {
    taskStore.getAllTasks()
  })

  $: tasks = $taskStore;
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
        <span id="add"><i class='bx bx-subdirectory-left return' on:click={addTask} on:keypress={addTask}></i></span>
      </div>
      {#if tasks}
        <!-- {@const toods = tasks.tasks} -->
        {#each tasks as task, id}
          <TaskList
            todo={task}
            active={currentActiveIndex === id}
            {id}
            on:toggleTask={toggleTask}
          />
        {/each}
        {:else}
          <p>No todos for now</p>
      {/if}
    </div>
  </div>
</main>

<style>
</style>
