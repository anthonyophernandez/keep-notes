<template>
  <div class="w-full h-full">
    <TopBar @toggleMenu="toggleMenu" @displayGrid="$store.dispatch('updateGridDisplayed', !isGridDisplayed)" :isGridDisplayed="isGridDisplayed"/>
    <SelectionBar
      :tags="tags"
      :selectedNotes="selectedNotes"
      @clearSelection="clearSelection"
      @pinNotes="pinNotes"
      @archiveNotes="archiveNotes"
      @changeColor="changeColor"
      @deleteNotes="deleteNotes"
      @copyNotes="copyNotes"
      @createLabel="createLabel"
      @selectTag="selectTag"
      :isTrashView="false"/>
    <SideMenu :isMenuDisplayed="isMenuDisplayed" :isMenuButtonPressed="isMenuButtonPressed" :tags="tags" @openEditLabelsModal="openEditLabelsModal"/>
    <MainSection ref="main" :isTrashView="false" @selection="setSelection" :notes="notes" :tags="tags" :isMenuDisplayed="isMenuDisplayed" :isGridDisplayed="isGridDisplayed"/>
    <EditLabelsModal :isModalOpen="isEditLabelsModalOpened" :labels="tags" @closeModal="isEditLabelsModalOpened = false"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MainSection from '../components/MainSection.vue'
import SideMenu from '../components/SideMenu.vue'
import TopBar from '../components/TopBar.vue'
import SelectionBar from '../components/SelectionBar.vue'

import EditLabelsModal from '../components/EditLabelsModal.vue'

export default {
  name: 'Label',
  components: {
    MainSection,
    TopBar,
    SideMenu,
    EditLabelsModal,
    SelectionBar
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
    },
    clearSelection () {
      this.selectedNotes.forEach(ele => {
        this.$refs.main.$refs['note-' + ele][0].selectNote()
      })
      this.selectedNotes = []
    },
    archiveNotes () {
      this.selectedNotes.forEach(elem => {
        this.$refs.main.$refs['note-' + elem][0].archiveNote()
      })
      this.clearSelection()
    },
    pinNotes () {
      this.selectedNotes.forEach(elem => {
        if (!this.$refs.main.$refs['note-' + elem][0].isPinned) {
          this.$refs.main.$refs['note-' + elem][0].pinNote()
        }
      })
      this.clearSelection()
    },
    changeColor (obj) {
      this.selectedNotes.forEach(elem => {
        this.$refs.main.$refs['note-' + elem][0].changeColor(obj)
      })
      this.clearSelection()
    },
    deleteNotes () {
      this.selectedNotes.forEach(elem => {
        this.$refs.main.$refs['note-' + elem][0].deleteNote()
      })
      this.clearSelection()
    },
    copyNotes () {
      this.selectedNotes.forEach(elem => {
        this.$refs.main.$refs['note-' + elem][0].copyNote()
      })
      this.clearSelection()
    },
    selectTag (obj) {
      if (obj.isChecked) {
        // Add label
        this.selectedNotes.forEach(elem => {
          if (this.$refs.main.$refs['note-' + elem][0].note.tagIds.indexOf(obj.label.id) === -1) {
            this.$refs.main.$refs['note-' + elem][0].addTagToNote(obj.label.id)
          }
        })
      } else {
        // Remove label
        this.selectedNotes.forEach(elem => {
          if (this.$refs.main.$refs['note-' + elem][0].note.tagIds.indexOf(obj.label.id) !== -1) {
            this.$refs.main.$refs['note-' + elem][0].deleteTagFromNote(obj.label.id)
          }
        })
      }
    },
    async createLabel (label) {
      const newLabel = {
        name: label
      }
      const tag = await this.$store.dispatch('createLabel', newLabel)
      this.selectedNotes.forEach(elem => {
        this.$refs.main.$refs['note-' + elem][0].addTagToNote(tag.id)
      })
      this.clearSelection()
    }
  },
  mounted () {
    const index = this.tags.indexOf(this.tag)
    this.$store.dispatch('updateSection', '3-' + index).catch(() => {})
  },
  updated () {
    const index = this.tags.indexOf(this.tag)
    this.$store.dispatch('updateSection', '3-' + index).catch(() => {})
  }
}
</script>
