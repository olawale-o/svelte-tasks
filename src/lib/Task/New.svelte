<script>
  import { taskStore } from '../store/taskStore';
  import { newTask, capitalize } from './utils';
  let text;
  export let placeholder;
  export let parentId;
  function addTask(e) {
    if ((e.key === 'Enter' || e.type === 'click') && text?.trim()) {
      newTask(e, { description: capitalize(text), id: parentId }, taskStore.addTask);
      text = '';
    }
  }
</script>
<div class="input-field">
  <input
    type="text"
    class="input"
    on:keyup={addTask}
    placeholder={`Add task to ${placeholder}`}
    bind:value={text}
  >
  <span id="add"><i class='bx bx-subdirectory-left return' on:click={addTask} on:keypress={addTask}></i></span>
</div>