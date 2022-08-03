<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let text;
  export let parentId;
  function addTask(e) {
    if (e.key === 'Enter' || e.type === 'click') {
      dispatch('addTask', {
        parentId,
        description: text,
      });
    }
    text = '';
  }
</script>
<div class="input-field">
  <input
    type="text"
    class="input"
    on:keyup={addTask}
    placeholder="Add to your list"
    bind:value={text}
  >
  <span id="add"><i class='bx bx-subdirectory-left return' on:click={addTask}></i></span>
</div>