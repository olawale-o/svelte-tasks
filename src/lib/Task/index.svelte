<script>
  import { createEventDispatcher } from 'svelte';
  import { taskStore } from '../store/taskStore';
  const dispatch = createEventDispatcher();
  export let task;
  export let id;
  let taskCard;
</script>

<li
  class="todo-list"
  bind:this={taskCard}
  on:dragstart={() => dispatch('start', { start: id })}
  on:dragenter={() => dispatch('enter', { enter: id })}
  on:dragover|preventDefault={() => false}
  on:dragend={() => dispatch('end', { })}
  draggable={true}
>
  <div class="field todo-list__task">
    <label class="label">
      <input
        type="checkbox"
        bind:checked={task.completed}
        on:change={() => taskStore.toggleTask(task)}
      >
      <span class="checkmark"></span>
    </label>
    <span class="todo-list__text">{task.description}</span>
    <i class="bx bx-trash-alt bin hide"></i>
    <i class="bx bx-dots-vertical-rounded move"></i>
  </div>
</li>

<style>
  .label {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 22px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .label input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    border: 2px solid #b7b7b7;
  }

  .label:hover input ~ .checkmark {
    background-color: transparent;
  }

  .label input:checked ~ .checkmark {
    background-color: transparent;
    border: none;
  }

  .checkmark::after {
    content: "";
    position: absolute;
    display: none;
  }

  .label .checkmark::after {
    left: 5px;
    top: 0px;
    width: 10px;
    height: 18px;
    border: solid #2196f3;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .label input:checked ~ .checkmark::after {
    display: block;
  }

  .todo-list {
    font-size: 1.6rem;
    background: #fff;
  }

  .todo-list__task {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .todo-list__text {
    margin-left: 1rem;
    flex: 5;
    display: flex;
    justify-content: space-between;
  }
</style>