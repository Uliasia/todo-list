<template>
  <div class="note">

    <div class="note__header">

      <div class="note__controle edit-panel__wrapper">
        <button class="note__button">
          <router-link :to="'/note/' + note.id">
            <span class="icon-edit"></span>
          </router-link>
        </button>
        <Dialog
          :show="showModalRemove"
          @positive-answ="$emit('remove-note')"
          @negative-answ="showModalRemove = false"
        >
          <h3 slot="header">Удалить?</h3>
        </Dialog>
        <button
          class="note__button"
          @click="showModalRemove = !showModalRemove"
        >
          <span class="icon-remove"></span>
        </button>
      </div>

      <h2 class="note__title ">
        {{note.title}}
      </h2>

    </div>

    <TodoList
      v-if="note.todos.length"
      :todos="this.note.todos"
      :isPreview="true"
    />

    <p v-else>Нет задач!</p>

  </div>
</template>

<script>
import Dialog from '@/components/Dialog'
import TodoList from '@/components/TodoList'

export default {
  name: 'NoteItemPreview',

  components: {
    Dialog,
    TodoList
  },

  data () {
    return {
      showModalRemove: false
    }
  },

  props: {
    note: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
  .note {
    box-sizing: border-box;
    margin: 7% 0;
    padding: 5%;

    border-radius: 10px;
    background-color: #d9b4cd6f;

    &__header {
      display: flex;
      flex-direction: row-reverse;
    }

    &__title {
      font-size: 1.2em;
    }

    &__controle {
      box-sizing: border-box;
      margin: auto 0 auto auto;
      padding: 2%;
    }
  }

</style>
