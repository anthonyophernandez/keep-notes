import Vue from 'vue'
import Vuex from 'vuex'

import Api from '../services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    tags: [
      {
        id: 1,
        name: 'label 1'
      },
      {
        id: 2,
        name: 'label 2'
      },
      {
        id: 3,
        name: 'label 3'
      }
    ]
  },
  mutations: {
    SET_NOTES (state, notes) {
      state.notes = notes
    },
    ADD_NOTE (state, note) {
      state.notes = [...[note], ...state.notes]
    },
    UPDATE_NOTE (state, note) {
      const noteToUpdate = state.notes.find(n => n.id === note.id)
      noteToUpdate.title = note.title
      noteToUpdate.content = note.content
      noteToUpdate.tags = note.tags
      noteToUpdate.isPinned = note.isPinned
      noteToUpdate.currentColor = note.currentColor
      noteToUpdate.selectedIndexColor = note.selectedIndexColor
    },
    DELETE_NOTE (state, note) {
      state.notes = state.notes.filter(n => n.id !== note.id)
    },
    ADD_LABEL (state, label) {
      state.tags = [...[label], ...state.tags]
    }
  },
  actions: {
    async loadAllNotes ({ commit }) {
      const response = await Api().get('/api/notes')
      const notes = response.data
      commit('SET_NOTES', notes)
    },
    async createNote ({ commit }, note) {
      const response = await Api().post('/api/notes', note)
      const savedNote = response.data
      commit('ADD_NOTE', savedNote)
    },
    async updateNote ({ commit }, note) {
      Api().put(`/api/notes/${note.id}`, note)
      commit('UPDATE_NOTE', note)
    },
    deleteNote ({ commit }, note) {
      Api().delete(`/api/notes/${note.id}`, note)
      commit('DELETE_NOTE', note)
    },
    addLabel ({ commit }, label) {
      commit('ADD_LABEL', label)
    }
  },
  modules: {
  }
})
