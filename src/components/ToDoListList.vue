<template>
    <div class="todoList-list">
        <h3>Tasks:</h3>
        <ul class="todoList-wrapper">
            <ToDoListTask v-for="task in sortedTasks"
                          :key="task.id"
                          :task="task"
                          @markComplete="markComplete"
                          @markImportant="markImportant"
                          @deleteTask="deleteTask" />
        </ul>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import ToDoListTask from '@/components/ToDoListTask.vue';

    export default defineComponent({
        name: 'ToDoListList',
        props: {
            sortedTasks: {
                type: Array,
            },
        },
        components: {
            ToDoListTask: ToDoListTask,
        },
        methods: {
            markComplete(id: number): void {
                this.$emit('markComplete', id);
            },
            markImportant(id: number): void {
                this.$emit('markImportant', id);
            },
            deleteTask(id: number): void {
                this.$emit('deleteTask', id);
            },
        },
    });
</script>

<style>
    .todoList-wrapper {
        padding: 0;
        list-style: none;
    }
</style>

