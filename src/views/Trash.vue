<template>
  <div>
    <TopBar @toggleMenu="toggleMenu" @displayGrid="$store.dispatch('updateGridDisplayed', !isGridDisplayed)" :isGridDisplayed="isGridDisplayed"/>
    <SideMenu :isMenuDisplayed="isMenuDisplayed" :isMenuButtonPressed="isMenuButtonPressed" :tags="tags" @openEditLabelsModal="openEditLabelsModal"/>
    <EditLabelsModal :isModalOpen="isEditLabelsModalOpened" :labels="tags" @closeModal="isEditLabelsModalOpened = false"/>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue'
import TopBar from '../components/TopBar.vue'
import EditLabelsModal from '../components/EditLabelsModal.vue'

import { mapState } from 'vuex'

export default {
  name: 'Trash',
  components: {
    SideMenu,
    TopBar,
    EditLabelsModal
  },
  data () {
    return {
      isEditLabelsModalOpened: false
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
    }
  }
}
</script>
