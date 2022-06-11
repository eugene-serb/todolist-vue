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
            console.log(sortedTasks);
            return sortedTasks;
        },
    },
    mounted() {
        this.tasks = this.getLocalStorage();
    },
}).mount('#todoList');

