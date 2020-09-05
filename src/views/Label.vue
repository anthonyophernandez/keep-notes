<template>
  <div class="w-full h-full">
    <MainSection ref="main" @selection="setSelection" :notes="notes" :tags="tags" :isMenuDisplayed="isMenuDisplayed" :isDisplayedGrid="isDisplayedGrid"/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import MainSection from '../components/MainSection.vue'

export default {
  name: 'Label',
  components: {
    MainSection
  },
  computed: {
    ...mapState({
      tags: state => state.tags
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
  }
}
</script>
