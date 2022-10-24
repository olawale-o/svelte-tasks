<script>
  import { onMount } from 'svelte';
  import { taskStore } from '../store/taskStore';
  import { positionStore } from '@/lib/store/positionStore';
  import { newChildTask } from './utils';
  let text;
  export let placeholder;
  export let parentId;
  function addTask(e) {
    if ((e.key === 'Enter' || e.type === 'click') && text?.trim()) {
      if (newChildTask(e, { description: text, parent_id: parentId, completed: false, position }, taskStore.addTask)) {
        positionStore.updatePosition()
      }
      text = '';
    }
  }
  onMount(() => positionStore.init());
  $: position = $positionStore
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
