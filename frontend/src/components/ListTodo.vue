<template>
  <div v-bind:show="todos.length > 0" class="col align-self-center">
    <div class="form-row align-items-center" v-for="todo in todos" :key="todo.id">
      <div class="col-auto my-1">
        <div class="input-group mb-3 todo__row">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <input
                type="checkbox"
                v-model="todo.done"
                :checked="todo.done"
                :value="todo.done"
                v-on:change="updateTodo(todo)"
                title="Mark as done?"
              />
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            :class="todo.done ? 'todo__done' : ''"
            v-model="todo.name"
            @keypress="todo.editing = true"
            @keyup.enter="updateTodo(todo)"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span
                class="input-group-addon addon-left"
                title="Delete todo?"
                v-on:click="deleteTodo(todo._id)"
              >
                X
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="alert alert-primary todo__row"
      v-show="todos.length == 0 && doneLoading"
    >
      Hardest worker in the room. No more todos now you can rest. ;)
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';
import { bus } from './../bus';
import TodoModel from '../models/TodoModel';
import Todo from '../models/TodoModel';


@Component
export default class ListTodo extends Vue {

  public todos: Todo[] = [];
  public doneLoading: boolean = false;
  public name: string = '';

  public created() {
    this.fetchTodo();
    this.listenToEvents();
  }

  @Watch('$route', {
    immediate: true, deep: true,
  })
  public projectChanged(doneLoading: boolean) {
    this.fetchTodo().then(() => {
        doneLoading = true;
      });
  }

  public fetchTodo() {
    return this.$axios.get('/').then((response) => {
      this.todos = response.data;
    });
  }

  public updateTodo(todo: Todo) {
    const id: number = todo._id;
    this.$axios
      .put(`/${id}`, todo);
  }

  public deleteTodo(id: number) {
    this.$axios
      .delete(`/${id}`).then(() => {
        this.fetchTodo();
    });
  }

  public listenToEvents() {
    bus.$on('refreshTodo', () => {
      this.fetchTodo();
    });
  }

}
</script>>

<style lang="scss" scoped>
.todo__done {
  text-decoration: line-through !important;
}

.no_border_left_right {
  border-left: 0px;
  border-right: 0px;
}

.flat_form {
  border-radius: 0px;
}

.mrb-10 {
  margin-bottom: 10px;
}

.addon-left {
  background-color: none !important;
  border-left: 0px !important;
  cursor: pointer !important;
}

.addon-right {
  background-color: none !important;
  border-right: 0px !important;
}
</style>