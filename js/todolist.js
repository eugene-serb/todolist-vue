'use strict';

class Task {
    constructor(title) {
        this.title = title;
        this.completed = false;
        this.important = false;
    };
};

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
                this.tasks.push(new Task(this.input));
                this.input = '';
                this.setLocalStorage(this.tasks);
            };
        },
        deleteAllTasks() {
            this.tasks = [];
            this.setLocalStorage(this.tasks);
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
            this.tasks.splice(index, 1);
            this.setLocalStorage(this.tasks);
        },
        filterTasks() {
            if (this.tasks.length) {
                const activeImportantTasks = this.tasks.length && this.tasks.filter(item => item.completed == false && item.important == true);
                const activeTasks = this.tasks.length && this.tasks.filter(item => item.completed == false && item.important == false);
                const completedImportantTasks = this.tasks.length && this.tasks.filter(item => item.completed == true && item.important == true);
                const completedTasks = this.tasks.length && this.tasks.filter(item => item.completed == true && item.important == false);

                this.tasks = [...activeImportantTasks, ...activeTasks, ...completedImportantTasks, ...completedTasks];
            }
        },
        getLocalStorage() {
            return localStorage.tasks ? JSON.parse(localStorage.getItem('tasks')) : [];
        },
        setLocalStorage(items) {
            localStorage.setItem('tasks', JSON.stringify(items));
        }
    },
    computed: {
        sortedTasks() {
            this.filterTasks();
            return this.tasks;
        }
    },
    mounted() {
        this.tasks = this.getLocalStorage();
    }
}).mount('#todoList');

