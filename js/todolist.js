'use strict';

Vue.createApp({
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
        markComplete(index) {
            this.tasks[index].completed = !this.tasks[index].completed;
            this.setLocalStorage(this.tasks);
        },
        markImportant(index) {
            this.tasks[index].important = !this.tasks[index].important;
            this.setLocalStorage(this.tasks);
        },
        deleteTask(index) {
            this.tasks[index].deleted = true;
            setTimeout(() => {
                this.tasks.splice(index, 1);
                this.setLocalStorage(this.tasks);
            }, 500);
        },
        filterTasks() {
            if (this.tasks.length) {
                const activeImportantTasks = this.tasks.length && this.tasks.filter(item => item.completed == false && item.important == true);
                const activeTasks = this.tasks.length && this.tasks.filter(item => item.completed == false && item.important == false);
                const completedImportantTasks = this.tasks.length && this.tasks.filter(item => item.completed == true && item.important == true);
                const completedTasks = this.tasks.length && this.tasks.filter(item => item.completed == true && item.important == false);

                this.tasks = [...activeImportantTasks, ...activeTasks, ...completedImportantTasks, ...completedTasks];
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
            this.filterTasks();
            return this.tasks;
        },
    },
    mounted() {
        this.tasks = this.getLocalStorage();
    },
}).mount('#todoList');

