<template>
  <div class="note-list">
    <button
      class="note-list__button"
      @click="createNewNote"
    >
      <span class="icon-plus"></span>
    </button>

    <hr>

    <ul>
      <NoteItemPreview
        v-for="note in getAllNotesPreview"
        :note="note"
        :key="note.id"
        @remove-note="removeNote(note.id)"
      />
    </ul>
  </div>
</template>

<script>
import NoteItemPreview from '@/components/NoteItemPreview'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'NoteList',

  components: {
    NoteItemPreview
  },

  computed: {
    ...mapGetters(['getAllNotesPreview'])
  },

  methods: {
    ...mapMutations(['removeNote', 'addNote']),
    ...mapActions(['uploadNotes']),

    newNoteId () {
      return (this.getAllNotesPreview.length) ? this.getAllNotesPreview[this.getAllNotesPreview.length - 1].id + 1 : 0
    },

    createNewNote () {
      const newNote = {
        id: this.newNoteId(),
        title: 'Заметка',
        todos: []
      }
      this.addNote(newNote)
      this.uploadNotes(this.$store.state)
      this.$router.push('/note/' + newNote.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .note-list {
    margin: 0 auto;

    &__button {
      width: 2em;
      height: 2em;
      margin: 0;

      font-size: 1.5625em;

      border-radius: 50%;
    }

    hr {
      width: 75%;

      border-color: #fad4e3;
    }

    ul {
      margin: 0;
      padding: 0;
    }
  }

</style>
