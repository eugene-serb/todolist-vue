<template>
  <div class="todoList">
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
  import Task from '@/models/Task';

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
          const task: Task = new Task(title as string);
          this.tasks.push(task as Task);
          this.setLocalStorage(this.tasks as Task[]);
        }
      },
      deleteAllTasks(): void {
        this.tasks.forEach(task => task.deleted = true);
        setTimeout(() => {
          this.tasks = [] as Task[];
          this.setLocalStorage(this.tasks as Task[]);
        }, 500);
      },
      deleteTask(id: number): void {
        this.tasks.forEach((task, index) => {
          if (task.id === id) {
            task.deleted = true;
            setTimeout(() => {
              this.tasks.splice(index, 1);
              this.setLocalStorage(this.tasks as Task[]);
            }, 500);
          }
        });
      },
      markComplete(id: number): void {
        this.tasks.forEach(task => {
          if (task.id === id) {
            task.completed = !task.completed;
          }
        });
        this.setLocalStorage(this.tasks as Task[]);
      },
      markImportant(id: number): void {
        this.tasks.forEach(task => {
          if (task.id === id) {
            task.important = !task.important;
          }
        });
        this.setLocalStorage(this.tasks as Task[]);
      },
      filterTasks(tasks: Task[]): Task[] {
        if (this.tasks.length > 0) {
          const activeImportantTasks = tasks.length && tasks.filter(item => item.completed === false && item.important === true);
          const activeTasks = tasks.length && tasks.filter(item => item.completed === false && item.important === false);
          const completedImportantTasks = tasks.length && tasks.filter(item => item.completed === true && item.important === true);
          const completedTasks = tasks.length && tasks.filter(item => item.completed === true && item.important === false);

          return [...(activeImportantTasks as Task[]), ...(activeTasks as Task[]), ...(completedImportantTasks as Task[]), ...(completedTasks as Task[])];
        }
        return [] as Task[];
      },
      getLocalStorage(): Task[] {
        return localStorage.tasksvue
          ? JSON.parse(localStorage.getItem('tasksvue') || '{}') as Task[]
          : [] as Task[];
      },
      setLocalStorage(tasks: Task[]): void {
        localStorage.setItem('tasksvue', JSON.stringify(tasks));
      },
    },
    computed: {
      sortedTasks(): Task[] {
        const sortedTasks: Task[] = this.filterTasks(this.tasks as Task[]);
        return sortedTasks as Task[];
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

