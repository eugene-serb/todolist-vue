<template>
    <div class="todoList" id="todoList">
        <ToDoListForm @addTask="addTask"
                      @deleteAllTasks="deleteAllTasks" />
        <ToDoListList :sortedTasks="sortedTasks"
                      @markComplete="markComplete"
                      @markImportant="markImportant"
                      @deleteTask="deleteTask" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import ToDoListForm from '@/components/ToDoListForm.vue';
    import ToDoListList from '@/components/ToDoListList.vue';

    interface ITask {
        readonly id: number,
        title: string,
        completed: boolean,
        important: boolean,
        deleted: boolean,
    }

    class Task implements ITask {
        readonly id: number;
        title: string;
        completed: boolean;
        important: boolean;
        deleted: boolean;

        constructor(title: string) {
            this.id = Date.now();
            this.title = title;
            this.completed = false;
            this.important = false;
            this.deleted = false;
        }
    }

    export default defineComponent({
        name: 'ToDoList',
        props: {},
        components: {
            ToDoListForm: ToDoListForm,
            ToDoListList: ToDoListList,
        },
        data: () => {
            return {
                tasks: [] as Task[],
            };
        },
        methods: {
            addTask(title: string): void {
                if (title) {
                    const task: Task = new Task(title);
                    this.tasks.push(task);
                    this.setLocalStorage(this.tasks);
                }
            },
            deleteAllTasks(): void {
                this.tasks.forEach((item) => {
                    item.deleted = true;
                });
                setTimeout(() => {
                    this.tasks = [];
                    this.setLocalStorage(this.tasks);
                }, 500);
            },
            markComplete(id: number): void {
                this.tasks.forEach(task => {
                    if (task.id === id) {
                        task.completed = !task.completed;
                    }
                });
                this.setLocalStorage(this.tasks);
            },
            markImportant(id: number): void {
                this.tasks.forEach(task => {
                    if (task.id === id) {
                        task.important = !task.important;
                    }
                });
                this.setLocalStorage(this.tasks);
            },
            deleteTask(id: number): void {
                this.tasks.forEach((task, index) => {
                    if (task.id === id) {
                        task.deleted = true;
                        setTimeout(() => {
                            this.tasks.splice(index, 1);
                            this.setLocalStorage(this.tasks);
                        }, 500);
                    }
                });
            },
            filterTasks(tasks: Task[]): Task[] {
                if (this.tasks.length > 0) {
                    const activeImportantTasks = tasks.length && tasks.filter(item => item.completed === false && item.important === true);
                    const activeTasks = tasks.length && tasks.filter(item => item.completed === false && item.important === false);
                    const completedImportantTasks = tasks.length && tasks.filter(item => item.completed === true && item.important === true);
                    const completedTasks = tasks.length && tasks.filter(item => item.completed === true && item.important === false);

                    return [...(activeImportantTasks as Task[]), ...(activeTasks as Task[]), ...(completedImportantTasks as Task[]), ...(completedTasks as Task[])];
                }
                return [];
            },
            getLocalStorage(): Task[] {
                return localStorage.tasksvue ? JSON.parse(localStorage.getItem('tasksvue') || '{}') : [];
            },
            setLocalStorage(tasks: Task[]): void {
                localStorage.setItem('tasksvue', JSON.stringify(tasks));
            },
        },
        computed: {
            sortedTasks() {
                const sortedTasks = this.filterTasks(this.tasks);
                return sortedTasks;
            },
        },
        mounted() {
            this.tasks = this.getLocalStorage();
        },
    });
</script>

<style>
    .todoList {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
</style>

