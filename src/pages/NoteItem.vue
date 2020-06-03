<template>
  <div class="note--edit">

    <div class="toolbar">
      <button>
        <router-link to="/">
          <span class="icon-back"></span>
        </router-link>
      </button>

      <div class="toolbar__right">
        <button
          :disabled="cachePosition === 0"
          @click="undo"
        >
          <span class="icon-undo"></span>
        </button>
        <button
          :disabled="cacheStates.length === cachePosition + 1"
          @click="redo"
        >
          <span class="icon-redo"></span>
        </button>
        <button
          :disabled="cacheStates.length === 1"
          @click="showModalCancel = !showModalCancel"
        >
          <span class="icon-cancel"></span>
        </button>
        <Dialog
          :show="showModalCancel"
          @positive-answ="cancel"
          @negative-answ="showModalCancel = false"
        >
          <h3 slot="header">Отменить все изменения?</h3>
        </Dialog>
        <button
          @click="showModalRemove = !showModalRemove"
        >
          <span class="icon-remove"></span>
        </button>
        <Dialog
          :show="showModalRemove"
          @positive-answ="remove"
          @negative-answ="showModalRemove = false"
        >
          <h3 slot="header">Удалить?</h3>
        </Dialog>
        <button
          :disabled="cacheStates.length === 1"
          @click="save"
        >
          <span class="icon-save"></span>
        </button>
      </div>

    </div>

    <div class="note__header">

      <div class="edit-panel__wrapper note__control" v-show="isEditing">
        <button
          @click="doneEdit()"
          class="edit note__button"
        >
          <span :class="'icon-positive'"></span>
        </button>
        <button
          @click="cancelEdit()"
          class="remove note__button"
        >
          <span :class="'icon-negative'"></span>
        </button>
      </div>

      <div class="edit-panel__wrapper note__control" v-show="!isEditing">
        <button
          class="note__button"
          @click="startEdit()"
        >
          <span :class="'icon-edit'"></span>
        </button>
      </div>

      <input
        ref="input"
        class="note__title"
        type="text"
        :disabled="!isEditing"
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
import Dialog from '@/components/Dialog'
import AddField from '@/components/AddField'
import TodoList from '@/components/TodoList'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'NoteItem',

  components: {
    Dialog,
    AddField,
    TodoList
  },

  data () {
    return {
      newTitle: null,
      newNote: null,
      isEditing: false,
      cacheStates: [],
      cachePosition: 0,
      showModalCancel: false,
      showModalRemove: false
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
    this.cacheStates.push(JSON.stringify(this.note))
    this.newTitle = this.newNote.title
  },

  methods: {
    ...mapMutations(['removeNote', 'saveNote']),
    ...mapActions(['uploadNotes']),

    // methods for todo
    createId () {
      return (this.newNote.todos.length) ? this.newNote.todos[this.newNote.todos.length - 1].id + 1 : 0
    },

    removeTodo (id) {
      this.newNote.todos = this.newNote.todos.filter(todo => todo.id !== id)
      this.commitEdit()
    },

    addTodo (content) {
      const newTodo = {
        id: this.createId(),
        content: content,
        isComplited: false
      }
      this.newNote.todos.push(newTodo)
      this.commitEdit()
    },

    editTodo (newTodo) {
      const curTodo = this.newNote.todos.find(todo => todo.id === newTodo.id)
      const index = this.newNote.todos.indexOf(curTodo)
      this.newNote.todos.splice(index, 1, newTodo)
      this.commitEdit()
    },

    toggleEdit () {
      this.isEditing = !this.isEditing
      if (this.isEditing) {
        this.$nextTick(() => this.$refs.input.focus())
      }
    },

    // methods for note.title
    startEdit () {
      this.toggleEdit()
      this.beforeEditCache = this.newTitle
    },

    doneEdit () {
      this.curTitle = this.newTitle.trim()
      if (!this.curTitle) {
        this.cancelEdit()
      } else {
        this.editTitle()
        this.toggleEdit()
      }
    },

    cancelEdit () {
      this.curTitle = this.beforeEditCache
      this.clearNewTitle()
      this.toggleEdit()
    },

    editTitle () {
      this.newNote.title = this.newTitle
      this.commitEdit()
    },

    clearNewTitle () {
      this.newTitle = this.newNote.title
    },

    // methods for note
    commitEdit () {
      this.cachePosition++
      this.cacheStates.length = this.cachePosition
      this.cacheStates.push(JSON.stringify(this.newNote))
    },

    undo () {
      if (this.cachePosition > 0) {
        this.cachePosition--
        this.newNote = JSON.parse(this.cacheStates[this.cachePosition])
      }
    },

    redo () {
      if (this.cachePosition < this.cacheStates.length - 1) {
        this.cachePosition++
        this.newNote = JSON.parse(this.cacheStates[this.cachePosition])
      }
    },

    cancel () {
      this.cachePosition = 0
      this.newNote = JSON.parse(this.cacheStates[this.cachePosition])
      this.cacheStates.length = 1
      this.showModalCancel = false
    },

    save () {
      this.saveNote(this.newNote)
      this.uploadNotes(this.$store.state)
      this.cachePosition = 0
      this.cacheStates.length = 1
      this.cacheStates[this.cachePosition] = this.newNote
    },

    remove () {
      this.removeNote(this.note.id)
      this.showModalRemove = false
      this.$router.push('/')
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
