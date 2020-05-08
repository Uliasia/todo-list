import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    uploadNotes (context, state) {
      const parsed = JSON.stringify(state.notes)
      localStorage.setItem('notes', parsed)
    },

    downloadNotes (context) {
      if (localStorage.getItem('notes')) {
        const notes = JSON.parse(localStorage.getItem('notes'))
        context.commit('updateNotes', notes)
      }
    }
  },

  mutations: {
    updateNotes (state, notes) {
      state.notes.length = 0
      state.notes = notes
    },

    removeNote (state, noteId) {
      const index = state.notes.findIndex(note => note.id === noteId)
      state.notes.splice(index, 1)
    },

    addNote (state, newNote) {
      state.notes.push(newNote)
    },

    saveNote (state, newNote) {
      const curNote = state.notes.find(note => note.id === newNote.id)
      const index = state.notes.indexOf(curNote)
      state.notes.splice(index, 1, newNote)
    }
  },

  state: {
    notes: []
  },

  getters: {
    getAllNotesPreview (state) {
      const allNotes = JSON.parse(JSON.stringify(state.notes)) // deep copy
      allNotes.forEach(note => {
        if (note.todos.length > 3) {
          note.todos.length = 3
        }
      })
      return allNotes
    },

    getNoteById (state) {
      return (noteId) => {
        return state.notes.find(note => note.id === noteId)
      }
    }
  }
})
