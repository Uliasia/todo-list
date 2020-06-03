<template>
  <li class="todo-item">

    <div class="todo-item__body">
      <input
        id="checkbox"
        class="todo-item__checkbox"
        type="checkbox"
        :checked="todo.isComplited"
        :disabled="isPreview || isEditing"
        @change="newTodo.isComplited = !newTodo.isComplited, editTodo()"
      >
      <input
        ref="input"
        class="todo-item__input"
        type="text"
        :disabled="isPreview || !isEditing"
        v-model="newContent"
        :class="{done: todo.isComplited}"
        maxlength="50"
        @blur="blur"
      >
    </div>

    <div  class="edit-panel" v-if="!isPreview">

      <div class="edit-panel__wrapper" v-show="isEditing">
        <button
          @click="doneEdit()"
          class="edit"
        >
          <span :class="'icon-positive'"></span>
        </button>
        <button
          @click="cancelEdit()"
          class="remove"
        >
          <span :class="'icon-negative'"></span>
        </button>
      </div>

      <div class="edit-panel__wrapper" v-show="!isEditing">
        <button
          :disabled="todo.isComplited"
          @click="startEdit()"
        >
          <span :class="'icon-edit'"></span>
        </button>
        <button
          @click="removeTodo()"
        >
          <span :class="'icon-remove'"></span>
        </button>
      </div>

    </div>

  </li>
</template>

<script>
export default {
  name: 'TodoItem',

  data () {
    return {
      isEditing: false,
      newContent: this.todo.content,
      newTodo: JSON.parse(JSON.stringify(this.todo))
    }
  },

  props: {
    todo: {
      type: Object,
      required: true
    },
    isPreview: Boolean
  },

  watch: {
    todo () {
      this.newContent = this.todo.content
      this.newTodo = JSON.parse(JSON.stringify(this.todo))
    }
  },

  methods: {
    async blur () {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(document.querySelector(':focus')))
      })
      const e = await promise
      if (e === null || !e.classList.contains('edit')) {
        this.cancelEdit()
      }
    },

    toggleEdit () {
      this.isEditing = !this.isEditing
      if (this.isEditing) {
        this.$nextTick(() => this.$refs.input.focus())
      }
    },

    startEdit () {
      this.toggleEdit()
      this.beforeEditCache = this.newTitle
    },

    doneEdit () {
      this.curContent = this.newContent.trim()
      if (!this.curContent) {
        this.removeTodo()
      } else {
        this.editTodo()
      }
      this.toggleEdit()
    },

    cancelEdit () {
      this.curContent = this.beforeEditCache
      this.clearNewContent()
      this.toggleEdit()
    },

    removeTodo () {
      this.$emit('remove-todo', this.todo.id)
      console.log('f')
    },

    editTodo () {
      this.newTodo.content = this.newContent
      this.$emit('edit-todo', this.newTodo)
    },

    clearNewContent () {
      this.newContent = this.todo.content
    }
  }
}
</script>

<style lang="scss">
  .todo-item {
    display: flex;
    justify-content: space-between;
    height: 100%;
    margin: .625em;

    &__body {
      display: flex;
      flex-grow: 1;
    }

    &__checkbox {
      position: relative;

      box-sizing: content-box;
      width: 1em;
      height: 1em;
      margin: 0;
      padding: .5em;

      border: solid #000 2px;
      border-radius: 5px;

      appearance: none;

      &:checked:before {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        font-size: 1.7em;

        content: '✔';
        text-align: center;
      }
    }

    &__input {
      width: 100%;
      margin: 0 2%;
      padding: 0 0 0 10px;

      word-break: break-all;
      border: none;
      border-radius: 5px;
    }
  }

  .edit-panel__wrapper {
    display: flex;

    button {
      margin: auto .125em;
      padding: .3em;

      font-size: .7em;
    }
  }

  .done {
    text-decoration: line-through;
  }

</style>
