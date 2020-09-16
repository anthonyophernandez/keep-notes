<template>
  <div>
    <TopBar @toggleMenu="toggleMenu" @displayGrid="$store.dispatch('updateGridDisplayed', !isGridDisplayed)" :isGridDisplayed="isGridDisplayed"/>
    <SideMenu :isMenuDisplayed="isMenuDisplayed" :isMenuButtonPressed="isMenuButtonPressed" :tags="tags" @openEditLabelsModal="openEditLabelsModal"/>
    <MainSection ref="main" @selection="setSelection" :notes="bin" :tags="tags" :isMenuDisplayed="isMenuDisplayed" :isGridDisplayed="isGridDisplayed"/>
    <EditLabelsModal :isModalOpen="isEditLabelsModalOpened" :labels="tags" @closeModal="isEditLabelsModalOpened = false"/>
  </div>
</template>

<script>
import MainSection from '../components/MainSection.vue'
import SideMenu from '../components/SideMenu.vue'
import TopBar from '../components/TopBar.vue'
import EditLabelsModal from '../components/EditLabelsModal.vue'

import { mapState } from 'vuex'

export default {
  name: 'Trash',
  components: {
    MainSection,
    SideMenu,
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
  async created () {
    await this.$store.dispatch('loadBin')
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
  },
  mounted () {
    this.$store.dispatch('updateSection', '6').catch(() => {})
  }
}
</script>
