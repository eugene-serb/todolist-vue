<template>
    <div class="todoList-list">
        <h3>Tasks:</h3>
        <ul class="todoList-wrapper">
            <Task v-for="(task, index) in sortedTasks"
                  :task="task"
                  @markComplete="markComplete"
                  @markImportant="markImportant"
                  @deleteTask="deleteTask" />
        </ul>
    </div>
</template>

<script>
    import Task from '@/components/ToDoListTask.vue';
    export default {
        name: 'List',
        props: {
            sortedTasks: {
                type: Array,
            },
        },
        components: {
            Task: Task,
        },
        methods: {
            markComplete(id) {
                this.$emit('markComplete', id);
            },
            markImportant(id) {
                this.$emit('markImportant', id);
            },
            deleteTask(id) {
                this.$emit('deleteTask', id);
            },
        },
    };
</script>

<style scoped>
    .todoList-wrapper {
        list-style: none;
        padding: 0;
    }
</style>

