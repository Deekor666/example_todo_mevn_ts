<template>
  <div class="container">
    <div class="row vertical-centre justify-content-center mt-50">
      <div class="col-md-6 mx-auto">
        <CreateTodo></CreateTodo>
        <ListTodo></ListTodo>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CreateTodo from '@/components/CreateTodo.vue';
import ListTodo from '@/components/ListTodo.vue';
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'App',
  components: {
    CreateTodo,
    ListTodo,
  },
})
export default class App extends Vue {
}
</script>


<style lang="scss">
.vertical-centre {
  min-height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
.todo__row {
  width: 400px;
}
</style>
