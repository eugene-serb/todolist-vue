<template>
    <li :key="task.id"
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
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'ToDoListTask',
        props: {
            task: {
                type: Object,
            },
        },
        methods: {
            markComplete(id: number): void {
                this.$emit('markComplete', id);
            },
            markImportant(id: number): void {
                this.$emit('markImportant', id);
            },
            deleteTask(id: number): void {
                this.$emit('deleteTask', id);
            },
        },
    });
</script>

<style>
    .taskItem {
        margin: 8px 0;
        padding: 8px;
        border: 2px solid var(--color-border);
        border-radius: var(--number-border-radius);
        background-color: var(--color-background);
        display: flex;
        justify-content: flex-start;
        gap: 16px
    }

    .taskItem__description {
        overflow-wrap: anywhere;
        align-self: center;
    }

    .taskItem_completed {
        opacity: 0.5;
    }

        .taskItem_completed > .taskItem__description {
            text-decoration: line-through;
        }

    .taskItem_important {
        border: 2px solid var(--color-link-hover);
    }

    .taskItem_deletion {
        animation: opacity 0.5s ease-in-out;
    }

    @keyframes opacity {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    .taskItem__button {
        padding: 0;
        margin: 8px;
        border: 0;
        width: 24px;
        height: 24px;
        background-color: transparent;
        background-repeat: no-repeat;
    }

        .taskItem__button:hover {
            border: none;
        }

    @media (prefers-color-scheme: light) {
        .taskItem__isNotCompleted {
            background-image: url('@/assets/img/check_box_outline_blank_black_24dp.svg');
        }
        .taskItem__isCompleted {
            background-image: url('@/assets/img/check_box_black_24dp.svg');
        }
        .taskItem__isNotImportant {
            background-image: url('@/assets/img/star_border_black_24dp.svg');
        }
        .taskItem__isImportant {
            background-image: url('@/assets/img/star_black_24dp.svg');
        }
        .taskItem__deleteButton {
            background-image: url('@/assets/img/delete_black_24dp.svg');
        }
    }

    @media (prefers-color-scheme: dark) {
        .taskItem__isNotCompleted {
            background-image: url('@/assets/img/check_box_outline_blank_white_24dp.svg');
        }
        .taskItem__isCompleted {
            background-image: url('@/assets/img/check_box_white_24dp.svg');
        }
        .taskItem__isNotImportant {
            background-image: url('@/assets/img/star_border_white_24dp.svg');
        }
        .taskItem__isImportant {
            background-image: url('@/assets/img/star_white_24dp.svg');
        }
        .taskItem__deleteButton {
            background-image: url('@/assets/img/delete_white_24dp.svg');
        }
    }
</style>

