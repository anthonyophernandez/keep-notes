<template>
  <div class="w-full h-full">
    <TopBar @toggleMenu="toggleMenu" @displayGrid="$store.dispatch('updateGridDisplayed', !isGridDisplayed)" :isGridDisplayed="isGridDisplayed"/>
    <SideMenu :isMenuDisplayed="isMenuDisplayed" :isMenuButtonPressed="isMenuButtonPressed" :tags="tags" @openEditLabelsModal="openEditLabelsModal"/>
    <MainSection ref="main" @selection="setSelection" :notes="notes" :tags="tags" :isMenuDisplayed="isMenuDisplayed" :isGridDisplayed="isGridDisplayed"/>
    <EditLabelsModal :isModalOpen="isEditLabelsModalOpened" :labels="tags" @closeModal="isEditLabelsModalOpened = false"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MainSection from '../components/MainSection.vue'
import SideMenu from '../components/SideMenu.vue'
import TopBar from '../components/TopBar.vue'

import EditLabelsModal from '../components/EditLabelsModal.vue'

export default {
  name: 'Label',
  components: {
    MainSection,
    TopBar,
    SideMenu,
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
      tags: state => state.tags,
      isMenuDisplayed: state => state.isMenuDisplayed,
      isGridDisplayed: state => state.isGridDisplayed,
      isMenuButtonPressed: state => state.isMenuButtonPressed
    }),
    ...mapGetters({
      getTag: 'getTag',
      getNote: 'getNote'
    }),
    tag () {
      return this.getTag(this.$route.params.id)
    },
    notes () {
      const notes = this.tag.noteIds.map(nId => this.getNote(nId))
      return notes
    }
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
    }
  }
}
</script>
