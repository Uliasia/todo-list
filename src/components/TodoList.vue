<template>
  <div>
    <ul>
      <TodoItem
        v-for="todo of todos"
        :todo="todo"
        :key="todo.id"
        @remove-todo="removeTodo"
        @edit-todo="editTodo"
      />
    </ul>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem'

export default {
  name: 'TodoList',

  data () {
    return {
      todos: Array
    }
  },

  components: {
    TodoItem
  },

  methods: {
    removeTodo (id) {
      this.$emit('remove-todo', id)
    },

    editTodo (newTodo) {
      this.$emit('edit-todo', newTodo)
    }
  }
}
</script>

<style lang="scss" scoped>
  ul {
    margin: 0;
    padding: 0;

    list-style: none;
  }

</style>
