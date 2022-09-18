<template>
  <ToDoList />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ToDoList from '@/components/ToDoList.vue';

  export default defineComponent({
    name: 'App',
    components: {
      ToDoList: ToDoList,
    },
  });
</script>

<style></style>

