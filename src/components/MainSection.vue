<template>
  <main class="fixed inset-0 px-2 mt-16 overflow-y-auto" :class="(isMenuDisplayed) ? 'ml-20 sm:ml-64 sm:z-40' : 'ml-20'">
    <TakeNote class="mx-auto mt-2 mb-8" :tags="tags"/>
    <div v-show="arePinned.length > 0" class="w-full text-center text-xs font-semibold text-gray-500">PINNED</div>
    <div class="grid gap-5 mt-4 mb-4" :class="(isDisplayedGrid) ? 'xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  md:mx-8 sm:mx-0' : 'grid-cols-1'">
      <NoteCard
        :ref="'note-'+ index"
        class="w-auto h-auto mx-auto"
        :class="openedNoteClass(index)"
        v-for="(note, index) in arePinned" :key="index"
        :index="index"
        :note="note"
        @open="openNote(index)"
        @select="addNoteToSelected"
        @unselect="removeNoteFromSelected"
        @close="closeNote"
        :tags="tags"
      />
    </div>
    <div v-show="arePinned.length > 0" class="w-full text-center text-xs font-semibold text-gray-500">OTHERS</div>
    <div class="grid gap-5 mt-4 mb-20" :class="(isDisplayedGrid) ? 'xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  md:mx-8 sm:mx-0' : 'grid-cols-1'">
      <NoteCard
        :ref="'note-'+ index"
        class="w-auto h-auto mx-auto"
        :class="openedNoteClass(index)"
        v-for="(note, index) in areNotPinned" :key="index"
        :index="index"
        :note="note"
        @open="openNote(index)"
        @select="addNoteToSelected"
        @unselect="removeNoteFromSelected"
        @close="closeNote"
        :tags="tags"
      />
    </div>
    <div v-show="isNoteOpened" class="fixed z-40 inset-0">
      <div class="mx-auto my-64 w-full max-w-xl rounded-lg bg-black">
        <NoteCard
          class="z-50"
          :note="selectedNote"
          :index="selectedNoteIndex"
          :isNoteOpened="isNoteOpened"
          @close="closeNote"
          :tags="tags"
        />
      </div>
      <div @click="closeNote" class="fixed z-40 inset-0 opacity-50 bg-black"></div>
    </div>
  </main>
</template>

<script>
import NoteCard from '../components/NoteCard.vue'
import TakeNote from '../components/TakeNote.vue'

export default {
  name: 'MainSection',
  components: {
    NoteCard,
    TakeNote
  },
  props: ['notes', 'tags', 'isMenuDisplayed', 'isDisplayedGrid'],
  data () {
    return {
      isNoteOpened: false,
      selectedNoteIndex: -1,
      selectedNote: {},
      selectedNotes: []
    }
  },
  computed: {
    arePinned () {
      return this.notes.filter(n => n.isPinned)
    },
    areNotPinned () {
      return this.notes.filter(n => !n.isPinned)
    }
  },
  methods: {
    openNote (index) {
      this.selectedNote = this.notes[index]
      this.selectedNoteIndex = index
      this.isNoteOpened = true
    },
    openedNoteClass (index) {
      return (this.selectedNoteIndex === index) ? 'border-yellow-500' : ''
    },
    closeNote () {
      this.selectedNoteIndex = -1
      this.isNoteOpened = false
    },
    addNoteToSelected (elem) {
      const index = this.selectedNotes.indexOf(elem)
      if (index === -1) {
        this.selectedNotes.push(elem)
      }
      this.$emit('selection', this.selectedNotes)
    },
    removeNoteFromSelected (elem) {
      const index = this.selectedNotes.indexOf(elem)
      if (index !== -1) {
        this.selectedNotes = [...this.selectedNotes.slice(0, index), ...this.selectedNotes.slice(index + 1)]
      }
      this.$emit('selection', this.selectedNotes)
    }
  }
}
</script>

<style>

</style>
