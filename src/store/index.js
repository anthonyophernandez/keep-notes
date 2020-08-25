import Vue from 'vue'
import Vuex from 'vuex'

import Api from '../services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    tags: []
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
    },
    SET_TAGS (state, tags) {
      state.tags = tags
    }
  },
  actions: {
    async loadAllNotes ({ commit }) {
      const response = await Api().get('/api/notes')
      const notes = response.data.data
      notes.forEach(n => {
        n.attributes.id = n.id
        n.attributes.tagIds = n.relationships.tags.data.map(t => t.id)
      })
      commit('SET_NOTES', notes.map(n => n.attributes))
    },
    async createNote ({ commit }, note) {
      const response = await Api().post('/api/notes', note)
      const savedNote = response.data.data
      savedNote.attributes.id = savedNote.id
      savedNote.attributes.tagIds = []
      commit('ADD_NOTE', savedNote.attributes)
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
    },
    async loadAllTags ({ commit }) {
      const response = await Api().get('/api/tags')
      const tags = response.data.data
      tags.forEach(t => {
        t.attributes.id = t.id
        t.attributes.noteIds = t.relationships.notes.data.map(n => n.id)
      })
      commit('SET_TAGS', tags.map(t => t.attributes))
    }
  },
  modules: {
  }
})
