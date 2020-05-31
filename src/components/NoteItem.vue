<template>
  <div class="note--edit">

    <div class="toolbar">
      <button>
        <span class="icon-back"></span>
      </button>

      <div class="toolbar__right">
        <button>
          <span class="icon-undo"></span>
        </button>
        <button>
          <span class="icon-redo"></span>
        </button>
        <button>
          <span class="icon-cancel"></span>
        </button>
        <button>
          <span class="icon-remove"></span>
        </button>
        <button>
          <span class="icon-save"></span>
        </button>
      </div>

    </div>

    <div class="note__header">

      <div  v-show="isEditing">
        <button>
          <span :class="'icon-positive'"></span>
        </button>
        <button>
          <span :class="'icon-negative'"></span>
        </button>
      </div>

      <div  v-show="!isEditing">
        <button>
          <span :class="'icon-edit'"></span>
        </button>
      </div>

      <input
        ref="input"
        class="note__title"
        type="text"
        v-model="newTitle"
        maxlength="35"
      >
    </div>

    <AddField
      @add-element="addTodo"
    />

    <TodoList
      v-if="newNote.todos.length"
      :todos="this.newNote.todos"
      @remove-todo="removeTodo"
      @edit-todo="editTodo"
    />

    <p v-else>Нет задач!</p>

  </div>
</template>

<script>
import AddField from '@/components/AddField'
import TodoList from '@/components/TodoList'
import { mapGetters } from 'vuex'

export default {
  name: 'NoteItem',

  components: {
    AddField,
    TodoList
  },

  data () {
    return {
      newTitle: null,
      newNote: null,
      isEditing: false
    }
  },

  computed: {
    ...mapGetters(['getNoteById']),

    note () {
      const id = +this.$route.params.id
      return this.getNoteById(id)
    }
  },

  watch: {
    newNote () {
      this.newTitle = this.newNote.title
    }
  },

  beforeMount () {
    this.newNote = JSON.parse(JSON.stringify(this.note)) // deep copy
    this.newTitle = this.newNote.title
  },

  methods: {
    createId () {
      return (this.newNote.todos.length) ? this.newNote.todos[this.newNote.todos.length - 1].id + 1 : 0
    },

    removeTodo (id) {
      this.newNote.todos = this.newNote.todos.filter(todo => todo.id !== id)
    },

    addTodo (content) {
      const newTodo = {
        id: this.createId(),
        content: content,
        isComplited: false
      }
      this.newNote.todos.push(newTodo)
    },

    editTodo (newTodo) {
      const curTodo = this.newNote.todos.find(todo => todo.id === newTodo.id)
      const index = this.newNote.todos.indexOf(curTodo)
      this.newNote.todos.splice(index, 1, newTodo)
    },

    toggleEdit () {
      this.isEditing = !this.isEditing
    }
  }
}
</script>

<style lang="scss" scoped>
  .toolbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__right {
      display: flex;
    }

    span {
      font-size: 1.5em;
    }
  }

  .note {

    &__header {
      justify-content: space-between;
      margin: 10% 0;
    }

    &__title {
      width: 80%;

      font-size: 1.5em;

      border: none;
    }

    &--edit {
      max-width: 768px;
      margin: 0 auto;
    }
  }

</style>
