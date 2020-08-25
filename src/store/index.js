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
    DELETE_NOTE (state, note) {
      state.notes = state.notes.filter(n => n.id !== note.id)
    },
    COPY_NOTE (state, note) {
      state.notes = [...[note], ...state.notes]
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
    addNote ({ commit }, note) {
      commit('ADD_NOTE', note)
    },
    deleteNote ({ commit }, note) {
      commit('DELETE_NOTE', note)
    },
    copyNote ({ commit }, note) {
      commit('COPY_NOTE', note)
    },
    addLabel ({ commit }, label) {
      commit('ADD_LABEL', label)
    }
  },
  modules: {
  }
})
