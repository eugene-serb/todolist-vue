<template>
    <fieldset class="todoList-form">
        <input type="text"
               placeholder="Description"
               class="todoList-form__description-task"
               v-model="input" />
        <button class="todoList-form__addTaskButton"
                @click="addTask">Add task</button>
        <button class="todoList-form__deleteAllTaskButton"
                @click="deleteAllTasks">Delete all</button>
    </fieldset>
</template>

<script>
    export default {
        name: 'Form',
        data: () => {
            return {
                input: '',
            };
        },
        methods: {
            addTask() {
                this.$emit('addTask', this.input);
                this.input = '';
            },
            deleteAllTasks() {
                this.$emit('deleteAllTasks');
            },
        },
    };
</script>

<style scoped>
    .todoList-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
    }

    .todoList-form__description-task {
        grid-column: 1 / 3;
    }

    .todoList-form__addTaskButton {
        grid-column: 1 / 2;
    }

    .todoList-form__deleteAllTaskButton {
        grid-column: 2 / 3;
    }
</style>

