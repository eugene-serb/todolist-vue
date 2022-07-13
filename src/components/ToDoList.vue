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
        id: number,
        title: string,
        completed: boolean,
        important: boolean,
        deleted: boolean,
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
                tasks: [] as ITask[],
            };
        },
        methods: {
            addTask(taskTitle: string): void {
                if (taskTitle) {
                    const newTask: ITask = {
                        id: Date.now(),
                        title: taskTitle,
                        completed: false,
                        important: false,
                        deleted: false,
                    };
                    this.tasks.push(newTask);
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
            filterTasks(): ITask[] {
                if (this.tasks.length > 0) {
                    const activeImportantTasks = this.tasks.length && this.tasks.filter(item => item.completed === false && item.important === true);
                    const activeTasks = this.tasks.length && this.tasks.filter(item => item.completed === false && item.important === false);
                    const completedImportantTasks = this.tasks.length && this.tasks.filter(item => item.completed === true && item.important === true);
                    const completedTasks = this.tasks.length && this.tasks.filter(item => item.completed === true && item.important === false);

                    return [...(activeImportantTasks as ITask[]), ...(activeTasks as ITask[]), ...(completedImportantTasks as ITask[]), ...(completedTasks as ITask[])];
                }
                return [];
            },
            getLocalStorage(): ITask[] {
                return localStorage.tasksvue ? JSON.parse(localStorage.getItem('tasksvue') || '{}') : [];
            },
            setLocalStorage(items: ITask[]): void {
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
    });
</script>

<style>
    .todoList {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
</style>

