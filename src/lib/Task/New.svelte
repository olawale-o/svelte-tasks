<script>
  import { taskStore } from '../store/taskStore';
  import { newChildTask } from './utils';
  let text;
  export let placeholder;
  export let parentId;
  function addTask(e) {
    if ((e.key === 'Enter' || e.type === 'click') && text?.trim()) {
      newChildTask(e, { description: text, parent_id: parentId, completed: false, }, taskStore.addTask);
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