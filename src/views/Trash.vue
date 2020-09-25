<template>
  <div>
    <TopBar @toggleMenu="toggleMenu" @displayGrid="$store.dispatch('updateGridDisplayed', !isGridDisplayed)" :isGridDisplayed="isGridDisplayed"/>
    <SelectionBar
      :tags="bin"
      :selectedNotes="selectedNotes"
      @clearSelection="clearSelection"
      @deleteNotesForever="deleteNotesForever"
      @restoreNotes="restoreNotes"
      :isTrashView="true"
      :isArchiveView="false"/>
    <SideMenu :isMenuDisplayed="isMenuDisplayed" :isMenuButtonPressed="isMenuButtonPressed" :tags="tags" @openEditLabelsModal="openEditLabelsModal"/>
    <MainSection ref="main" :isTrashView="true" :isArchiveView="false" @selection="setSelection" :notes="bin" :tags="tags" :isMenuDisplayed="isMenuDisplayed" :isGridDisplayed="isGridDisplayed"/>
    <EditLabelsModal :isModalOpen="isEditLabelsModalOpened" :labels="tags" @closeModal="isEditLabelsModalOpened = false"/>
  </div>
</template>

<script>
import MainSection from '../components/MainSection.vue'
import SelectionBar from '../components/SelectionBar.vue'
import SideMenu from '../components/SideMenu.vue'
import TopBar from '../components/TopBar.vue'
import EditLabelsModal from '../components/EditLabelsModal.vue'

import { mapState } from 'vuex'

export default {
  name: 'Trash',
  components: {
    MainSection,
    SideMenu,
    SelectionBar,
    TopBar,
    EditLabelsModal
  },
  data () {
    return {
      isEditLabelsModalOpened: false,
      selectedNotes: []
    }
  },
  computed: {
    ...mapState({
      bin: state => state.bin,
      tags: state => state.tags,
      isMenuDisplayed: state => state.isMenuDisplayed,
      isGridDisplayed: state => state.isGridDisplayed,
      isMenuButtonPressed: state => state.isMenuButtonPressed
    })
  },
  methods: {
    toggleMenu () {
      this.$store.dispatch('updateMenuButtonPressed', !this.isMenuButtonPressed)
      this.$store.dispatch('updateMenuDisplayed', !this.isMenuDisplayed)
    },
    openEditLabelsModal () {
      this.isEditLabelsModalOpened = true
    },
    setSelection (selectedNotes) {
      this.selectedNotes = selectedNotes
    },
    clearSelection () {
      this.selectedNotes.forEach(ele => {
        this.$refs.main.$refs['note-' + ele][0].selectNote()
      })
      this.selectedNotes = []
    },
    deleteNotesForever () {
      this.selectedNotes.forEach(elem => {
        this.$refs.main.$refs['note-' + elem][0].deleteNoteForever()
      })
      this.clearSelection()
    },
    restoreNotes () {
      this.selectedNotes.forEach(elem => {
        this.$refs.main.$refs['note-' + elem][0].restoreNote()
      })
      this.clearSelection()
    }
  },
  mounted () {
    this.$store.dispatch('updateSection', '6').catch(() => {})
  }
}
</script>
