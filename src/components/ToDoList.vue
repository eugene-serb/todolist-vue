<template>
    <div class="todoList" id="todoList">
        <Form @addTask="addTask"
              @deleteAllTasks="deleteAllTasks" />
        <List :sortedTasks="sortedTasks"
              @markComplete="markComplete"
              @markImportant="markImportant"
              @deleteTask="deleteTask" />
    </div>
</template>

<script>
    import Form from '@/components/ToDoListForm.vue';
    import List from '@/components/ToDoListList.vue';
    export default {
        name: 'ToDoList',
        props: {},
        components: {
            Form: Form,
            List: List,
        },
        data: () => {
            return {
                tasks: [],
            };
        },
        methods: {
            addTask(task) {
                if (task) {
                    const newTask = {
                        id: Date.now(),
                        title: task,
                        completed: false,
                        important: false,
                        deleted: false,
                    };
                    this.tasks.push(newTask);
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
    .todoList {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
</style>

