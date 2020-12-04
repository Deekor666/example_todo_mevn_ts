<template>
  <div class="col align-self-center">
    <h3 class="pb-5 text-left underline">Create todos</h3>
    <form class="sign-in" @submit.prevent>
      <div class="form-group todo__row">
        <input
          type="text"
          class="form-control"
          @keypress="typing = true"
          placeholder="What do you want to do?"
          v-model="name"
          @keyup.enter="addTodo($event)"
        />
        <small class="form-text text-muted" v-show="typing"
          >Hit enter to save</small
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import { bus } from './../bus';


@Component
export default class CreateTodo extends Vue {

  public name: string = '';
  public typing: boolean = false;

  public addTodo(event: Event) {
    if (event) {event.preventDefault(); }
    const todo = {
      name: this.name,
      done: false,
    };
    this.$axios
      .post('/', todo)
      .then((response) => {
        this.clearTodo();
        this.refreshTodo();
        this.typing = false;
      });
  }

  public clearTodo() {
    this.name = '';
  }

  public refreshTodo() {
    bus.$emit('refreshTodo');
  }
}
</script>>

<style lang="scss">
.underline {
  text-decoration: underline;
}
</style>