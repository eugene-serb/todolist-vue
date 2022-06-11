<template>
    <div class="todoList" id="todoList">
        <fieldset class="todoList-form">
            <input type="text" placeholder="Description" class="todoList-form__description-task" v-model="input" />
            <button class="todoList-form__addTaskButton" @click="addTask">Add task</button>
            <button class="todoList-form__deleteAllTaskButton" @click="deleteAllTasks">Delete all</button>
        </fieldset>
        <div class="todoList-list">
            <h3>Tasks:</h3>
            <ul class="todoList-wrapper" v-cloak>
                <li v-for="(task, index) in sortedTasks"
                    :key="task.id"
                    :class="[
                            'taskItem',
                            task.completed ? 'taskItem_completed' : '',
                            task.important ? 'taskItem_important' : '',
                            task.deleted ? 'taskItem_deletion' : '',
                            ]">
                    <div class="taskItem__buttonsContainer">
                        <button @click="markComplete(task.id)"
                                :class="[
                                        'taskItem__button',
                                        task.completed ? 'taskItem__isCompleted' : 'taskItem__isNotCompleted'
                                        ]"></button>
                        <button @click="markImportant(task.id)"
                                :class="[
                                        'taskItem__button',
                                        task.important ? 'taskItem__isImportant' : 'taskItem__isNotImportant'
                                        ]"></button>
                        <button @click="deleteTask(task.id)"
                                class="taskItem__button taskItem__deleteButton"></button>
                    </div>
                    <span class="taskItem__description" v-text="task.title"></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ToDoList',
        props: {},
        data: () => {
            return {
                tasks: [],
                input: ''
            };
        },
        methods: {
            addTask() {
                if (this.input) {
                    const newTask = {
                        id: Date.now(),
                        title: this.input,
                        completed: false,
                        important: false,
                        deleted: false,
                    };
                    this.tasks.push(newTask);
                    this.input = '';
                    this.setLocalStorage(this.tasks);
                };
            },
            deleteAllTasks() {
                this.tasks.forEach((item) => {
                    item.deleted = true;
                });
                setTimeout(() => {
                    this.tasks = [];
                    this.setLocalStorage(this.tasks);
                }, 500);
            },
            markComplete(id) {
                this.tasks.forEach(task => {
                    if (task.id === id) {
                        task.completed = !task.completed;
                    };
                });
                this.setLocalStorage(this.tasks);
            },
            markImportant(id) {
                this.tasks.forEach(task => {
                    if (task.id === id) {
                        task.important = !task.important;
                    };
                });
                this.setLocalStorage(this.tasks);
            },
            deleteTask(id) {
                this.tasks.forEach((task, index) => {
                    if (task.id === id) {
                        task.deleted = true;
                        setTimeout(() => {
                            this.tasks.splice(index, 1);
                            this.setLocalStorage(this.tasks);
                        }, 500);
                    };
                });
            },
            filterTasks() {
                if (this.tasks.length) {
                    const activeImportantTasks = this.tasks.length && this.tasks.filter(item => item.completed == false && item.important == true);
                    const activeTasks = this.tasks.length && this.tasks.filter(item => item.completed == false && item.important == false);
                    const completedImportantTasks = this.tasks.length && this.tasks.filter(item => item.completed == true && item.important == true);
                    const completedTasks = this.tasks.length && this.tasks.filter(item => item.completed == true && item.important == false);

                    return [...activeImportantTasks, ...activeTasks, ...completedImportantTasks, ...completedTasks];
                };
            },
            getLocalStorage() {
                return localStorage.tasksvue ? JSON.parse(localStorage.getItem('tasksvue')) : [];
            },
            setLocalStorage(items) {
                localStorage.setItem('tasksvue', JSON.stringify(items));
            },
        },
        computed: {
            sortedTasks() {
                const sortedTasks = this.filterTasks();
                return sortedTasks;
            },
        },
        mounted() {
            this.tasks = this.getLocalStorage();
        },
    };
</script>

<style scoped>

</style>

