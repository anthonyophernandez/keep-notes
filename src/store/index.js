import Vue from 'vue'
import Vuex from 'vuex'

import Api from '../services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    tags: [],
    archive: [],
    bin: [],
    isMenuDisplayed: false,
    isGridDisplayed: false,
    isMenuButtonPressed: false,
    sectionSelected: '1'
  },
  mutations: {
    SET_NOTES (state, notes) {
      state.notes = notes
    },
    ADD_NOTE (state, note) {
      state.notes = [note].concat(state.notes)
    },
    UPDATE_NOTE (state, note) {
      state.notes.forEach(n => {
        if (n.id === note.id) {
          n = note
        }
      })
    },
    DELETE_NOTE (state, note) {
      state.notes = state.notes.filter(n => n.id !== note.id)
    },
    ADD_LABEL (state, label) {
      state.tags = [label].concat(state.tags)
    },
    DELETE_LABEL (state, label) {
      state.tags = state.tags.filter(t => t.id !== label.id)
    },
    UPDATE_LABEL (state, label) {
      state.tags.forEach(t => {
        if (t.id === label.id) {
          t = label
        }
      })
    },
    SET_TAGS (state, tags) {
      state.tags = tags
    },
    CONNECT_TAG_TO_NOTE (state, { note, tag }) {
      note.tagIds.unshift(tag.id.toString())
      tag.noteIds = tag.noteIds.concat(note.id.toString())
    },
    DISCONNECT_TAG_FROM_NOTE (state, { note, tag }) {
      note.tagIds = note.tagIds.filter(t => t !== tag.id)
      tag.noteIds = tag.noteIds.filter(n => n !== note.id)
    },
    DISCONNECT_NOTE_FROM_TAG (state, { note, tag }) {
      tag.noteIds = tag.noteIds.filter(n => n !== note.id)
    },
    CONNECT_NOTE_TO_TAG (state, { note, tag }) {
      tag.noteIds.unshift(note.id.toString())
    },
    SET_MENU_DISPLAYED (state, isMenuDisplayed) {
      state.isMenuDisplayed = isMenuDisplayed
    },
    SET_GRID_DISPLAYED (state, isGridDisplayed) {
      state.isGridDisplayed = isGridDisplayed
    },
    SET_MENU_BUTTON_PRESSED (state, isMenuButtonPressed) {
      state.isMenuButtonPressed = isMenuButtonPressed
    },
    SET_SELECTION (state, sectionSelected) {
      state.sectionSelected = sectionSelected
    },
    ADD_NOTE_ID_TO_BIN (state, note) {
      state.bin = [note].concat(state.bin)
    },
    SET_BIN (state, bin) {
      state.bin = bin
    },
    DELETE_FOREVER (state, note) {
      state.bin = state.bin.filter(n => n.id !== note.id)
    },
    SET_ARCHIVE (state, archive) {
      state.archive = archive
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
      savedNote.attributes.tagIds = savedNote.relationships.tags.data.map(t => t.id)
      commit('ADD_NOTE', savedNote.attributes)
      return savedNote.attributes
    },
    async updateNote ({ commit }, note) {
      await Api().put(`/api/notes/${note.id}`, note)
      commit('UPDATE_NOTE', note)
    },
    async deleteNote ({ commit }, note) {
      const binResponse = await Api().post('/api/bin', note)
      const response = await Api().delete(`/api/notes/${note.id}`, note)
      if (response.status === 200 || response.status === 204) {
        commit('DELETE_NOTE', note)
        commit('ADD_NOTE_ID_TO_BIN', binResponse.data)
      }
    },
    async loadAllTags ({ commit }) {
      const response = await Api().get('/api/tags')
      const tags = response.data.data
      tags.forEach(t => {
        t.attributes.id = t.id
        t.attributes.noteIds = t.relationships.notes.data.map(n => n.id)
      })
      commit('SET_TAGS', tags.map(t => t.attributes))
    },
    async createLabel ({ commit }, label) {
      const response = await Api().post('/api/tags', label)
      const savedTag = response.data.data
      savedTag.attributes.id = savedTag.id
      savedTag.attributes.noteIds = savedTag.relationships.notes.data.map(n => n.id)
      commit('ADD_LABEL', savedTag.attributes)
      return savedTag.attributes
    },
    async deleteTag ({ commit }, tag) {
      const response = await Api().delete(`/api/tags/${tag.id}`, tag)
      if (response.status === 200 || response.status === 204) {
        commit('DELETE_LABEL', tag)
      }
    },
    async updateTag ({ commit }, tag) {
      await Api().put(`/api/tags/${tag.id}`, tag)
      commit('UPDATE_LABEL', tag)
    },
    async connectTagToNote ({ commit }, { note, tag }) {
      await Api().post('/api/note_tags', {
        noteId: note.id,
        tagId: tag.id
      })
      commit('CONNECT_TAG_TO_NOTE', { note, tag })
    },
    async connectNoteToTag ({ commit }, { note, tag }) {
      await Api().post('/api/note_tags', {
        noteId: note.id,
        tagId: tag.id
      })
      commit('CONNECT_NOTE_TO_TAG', { note, tag })
    },
    async disconnectTagFromNote ({ commit }, { note, tag }) {
      await Api().post('/api/note_tags/delete', {
        noteId: note.id,
        tagId: tag.id
      })
      commit('DISCONNECT_TAG_FROM_NOTE', { note, tag })
    },
    async disconnectNoteFromTag ({ commit }, { note, tag }) {
      await Api().post('/api/note_tags/delete', {
        noteId: note.id,
        tagId: tag.id
      })
      commit('DISCONNECT_NOTE_FROM_TAG', { note, tag })
    },
    async loadBin ({ commit }) {
      const response = await Api().get('/api/bin')
      commit('SET_BIN', response.data)
    },
    async deleteNoteForever ({ commit }, note) {
      const response = await Api().delete(`/api/bin/${note.id}`, note)
      commit('DELETE_FOREVER', response.data)
    },
    async loadArchive ({ commit }) {
      const response = await Api().get('/api/archive')
      commit('SET_ARCHIVE', response.data)
    },
    updateMenuDisplayed ({ commit }, isMenuDisplayed) {
      commit('SET_MENU_DISPLAYED', isMenuDisplayed)
    },
    updateGridDisplayed ({ commit }, isGridDisplayed) {
      commit('SET_GRID_DISPLAYED', isGridDisplayed)
    },
    updateMenuButtonPressed ({ commit }, isMenuButtonPressed) {
      commit('SET_MENU_BUTTON_PRESSED', isMenuButtonPressed)
    },
    updateSection ({ commit }, sectionSelected) {
      commit('SET_SELECTION', sectionSelected)
    }
  },
  getters: {
    getTag: state => id => {
      return state.tags.find(t => t.id === id)
    },
    getNote: state => id => {
      return state.notes.find(n => n.id === id)
    }
  }
})
