<template>
  <div class="relative flex flex-col w-full max-w-xl rounded-lg" :class="[note.currentColor, (note.currentColor === 'bg-black')? 'bg-opacity-100' : 'bg-opacity-25', (isSelected) ? 'border-2 border-white' : 'border border-gray-700']" @mouseover="isVisible = true" @mouseleave="isVisible = false">
    <div v-show="!isVisible && !isNoteOpened && !isSelected" class="w-5 h-6 -mt-2 -ml-2"></div>
    <div v-show="isNoteOpened" class="w-5 h-6 -mt-2 -ml-2"></div>
    <button v-show="isVisible && !isNoteOpened || isSelected" class="relative flex items-center justify-center w-5 h-6 -mt-2 -ml-2 focus:outline-none" @click="selectNote" @mouseover="showTooltip('select-note')" @mouseleave="hideTooltip('select-note')">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 stroke-current bg-white rounded-full icon icon-tabler icon-tabler-check" viewBox="0 0 24 24" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <path d="M5 12l5 5l10 -10" />
      </svg>
      <div ref="select-note" class="hidden absolute items-center justify-center w-20 -mb-12 -mr-16 lg:mr-0 rounded bg-gray-700 bg-opacity-75">
        <span v-show="!isSelected" class="text-xs text-white break-normal">Select note</span>
        <span v-show="isSelected" class="text-xs text-white break-normal">Deselect note</span>
      </div>
    </button>
    <div class="absolute top-0 right-0">
      <button v-if="!isTrashView" class="relative flex items-center justify-center w-8 h-8 mt-2 mr-1 rounded-full hover:bg-gray-600 hover:bg-opacity-25 hover:text-white focus:outline-none" :class="(note.isPinned) ? 'text-white' : 'text-gray-600'" @click="pinNote" @mouseover="showTooltip('pin-note')" @mouseleave="hideTooltip('pin-note')">
        <svg v-show="isVisible || isNoteOpened || note.isPinned" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-current icon icon-tabler icon-tabler-anchor" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2" />
          <circle cx="12" cy="6" r="3" />
        </svg>
        <div ref="pin-note" class="hidden absolute items-center justify-center w-16 -mb-16 rounded bg-gray-700 bg-opacity-75">
          <span v-show="!note.isPinned" class="text-xs text-white">Pin note</span>
          <span v-show="note.isPinned" class="text-xs text-white">Unpin note</span>
        </div>
      </button>
    </div>
    <div v-if="!isNoteOpened || isTrashView" class="w-full h-full pl-4 pr-10" @click="$emit('open')">
      <h2 class="text-base text-white break-words font-bold" :class="(isNoteOpened) ? 'mt-0' : 'mt-2'">{{ note.title }}</h2>
      <div class="mt-2">
        <p class="text-sm text-white break-all">
          {{ note.content }}
        </p>
      </div>
    </div>
    <div v-else class="w-full h-full my-2 pl-4 pr-10">
      <textarea v-model="note.title" class="resize-y h-auto w-full mb-2 bg-transparent text-white text-lg font-bold placeholder-gray-500 focus:outline-none" placeholder="Title" rows="2"></textarea>
      <textarea v-model="note.content" class="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none" placeholder="Take a note..." rows="3" ></textarea>
    </div>
    <div class="w-full px-2 mb-2" :class="(isNoteOpened) ? 'mt-4' : 'mt-0'">
      <div
        class="relative inline-block mx-1 mb-1 px-2 rounded-full border border-gray-700"
        v-for="(tagId, index) in note.tagIds"
        :key="index"
        @mouseover="showClose('tag-' + index)"
        @mouseleave="hideClose('tag-' + index)"
      >
        <span class="cursor-pointer text-white text-xs">{{ getTag(tagId).name }}</span>
        <button
          v-show="!isTrashView"
          :ref="'tag-' + index"
          class="absolute top-0 right-0 hidden items-center justify-center bg-black text-gray-700 w-6 h-6 rounded-full hover:text-gray-500 hover:bg-gray-700 focus:outline-none"
          @click="deleteTagFromNote(tagId)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current icon icon-tabler icon-tabler-x" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
    <div v-if="!isTrashView" class="flex items-center justify-between w-full h-12 mb-1 px-2">
      <div v-show="isVisible || isNoteOpened" class="flex items-center">
        <div class="relative">
          <div class="absolute z-40 w-48 -mt-32 -mr-24 py-1 bg-black text-white border rounded" v-if="isShownReminderSection" @mouseleave="isShownReminderSection = false">
            <div class="w-full px-2 py-2 ">
              <span>Reminder:</span>
            </div>
            <div class="cursor-pointer flex items-center justify-between w-full px-2 py-2 hover:bg-white hover:bg-opacity-25 text-sm">
              <span>Later today</span>
              <span class="text-gray-500">8:00 AM</span>
            </div>
            <div class="cursor-pointer flex items-center justify-between w-full px-2 py-2 hover:bg-white hover:bg-opacity-25 text-sm">
              <span>Tomorrow</span>
              <span class="text-gray-500">8:00 AM</span>
            </div>
            <div class="cursor-pointer flex items-center justify-between w-full px-2 py-2 hover:bg-white hover:bg-opacity-25 text-sm">
              <span>Next week</span>
              <span class="text-gray-500">Mon, 8:00 PM</span>
            </div>
          </div>
          <button class="relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @click="isShownReminderSection = true" @mouseover="showTooltip('remind-me')" @mouseleave="hideTooltip('remind-me')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-bell" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
              <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
            </svg>
            <div ref="remind-me" class="hidden absolute items-center justify-center w-20 -mb-16 -mr-4 lg:mr-0 rounded bg-gray-700 bg-opacity-75">
              <span class="text-xs text-white">Remind me</span>
            </div>
          </button>
        </div>
        <div class="relative">
          <ColorSelector v-if="isShownColorSelector" class="absolute -mt-20 -ml-6" :selectedIndexColor="note.selectedIndexColor" @changeColor="changeColor" @mouseleave.native="isShownColorSelector = false"/>
          <button
            class="relative flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none"
            @click="isShownColorSelector = !isShownColorSelector"
            @mouseover="showTooltip('change-color')"
            @mouseleave="hideTooltip('change-color')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-palette" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M12 21a9 9 0 1 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
              <circle cx="7.5" cy="10.5" r=".5" fill="currentColor" />
              <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
              <circle cx="16.5" cy="10.5" r=".5" fill="currentColor" />
            </svg>
            <div ref="change-color" class="hidden absolute items-center justify-center w-20 -mb-16 rounded bg-gray-700 bg-opacity-75">
              <span class="text-xs text-white">Change color</span>
            </div>
          </button>
        </div>
        <button class="relative flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 hover:text-white focus:outline-none" :class="(note.isArchived) ? 'text-white' : 'text-gray-600'" @click="archiveNote" @mouseover="showTooltip('archive')" @mouseleave="hideTooltip('archive')">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current icon icon-tabler icon-tabler-archive" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <rect x="3" y="4" width="18" height="4" rx="2" />
            <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
            <line x1="10" y1="12" x2="14" y2="12" />
          </svg>
          <div ref="archive" class="hidden absolute items-center justify-center px-1 -mb-16 rounded bg-gray-700 bg-opacity-75">
            <span v-show="!note.isArchived" class="text-xs text-white">Archive</span>
            <span v-show="note.isArchived" class="text-xs text-white">Unarchive</span>
          </div>
        </button>
        <div class="relative">
          <div class="absolute z-40 w-40 sm:w-48 -mt-32 -mr-24 py-1 bg-black text-white border rounded" v-if="isShownLabelSection" @mouseleave="isShownLabelSection = false">
            <div class="w-full pl-2 pr-1 mb-3">
              <label for="label" class="text-sm">Label note</label>
              <input class="w-full bg-transparent text-xs" v-model="label" maxlength="50" name="label" id="label" type="text" placeholder="Enter label name">
            </div>
            <div v-for="(tag, index) in tags" :key="index" class="flex items-center cursor-pointer w-full py-1 hover:bg-white hover:bg-opacity-25">
              <input :ref="'check-' + index" class="h-3 w-3 ml-2 mr-2 cursor-pointer appearance-none border checked:bg-white" :checked="note.tagIds.indexOf(tag.id) !== -1" type="checkbox" name="select-tag" id="select-tag">
              <span class="w-full text-sm text-white" @click="selectTag(index, tag)">{{ tag.name }}</span>
            </div>
            <div v-if="label.length > 0" class="relative cursor-pointer w-full pt-1 px-1 text-white border-t" @click="createLabel">
              <div class="absolute top-0 left-0 w-5 h-5 ml-1 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 stroke-current icon icon-tabler icon-tabler-plus" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <div class="ml-5 break-all text-xs font-semibold">Create "{{ label }} "</div>
            </div>
          </div>
          <button class="relative flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @click="isShownMoreSection =! isShownMoreSection" @mouseover="showTooltip('more')" @mouseleave="hideTooltip('more')">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current icon icon-tabler icon-tabler-dots-vertical" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="19" r="1" />
              <circle cx="12" cy="5" r="1" />
            </svg>
            <div ref="more" class="hidden z-50 absolute items-center justify-center px-1 -mb-16 rounded bg-gray-700 bg-opacity-75">
              <span class="text-xs text-white">More</span>
            </div>
          </button>
          <div class="absolute z-40 w-24 -ml-6 py-1 bg-black text-white border rounded" v-if="isShownMoreSection" @mouseleave="isShownMoreSection = false">
            <button class="w-full focus:outline-none hover:bg-gray-500 hover:bg-opacity-25" @click="deleteNote">
              <span class="text-sm">Delete note</span>
            </button>
            <button class="w-full focus:outline-none hover:bg-gray-500 hover:bg-opacity-25" @click="openLabelSection">
              <span class="text-sm">Add label</span>
            </button>
            <button class="w-full focus:outline-none hover:bg-gray-500 hover:bg-opacity-25" @click="copyNote">
              <span class="text-sm">Make a copy</span>
            </button>
          </div>
        </div>
      </div>
      <button v-show="isNoteOpened" class="px-3 h-8 rounded hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @click="close">Close</button>
    </div>
    <div v-else class="flex items-center w-full h-12 mb-1 px-2">
      <button class="relative flex items-center justify-center w-8 h-8 mr-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @click="deleteNoteForever" @mouseover="showTooltip('delete-forever')" @mouseleave="hideTooltip('delete-forever')">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current icon icon-tabler icon-tabler-trash" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
        <div ref="delete-forever" class="hidden absolute items-center justify-center w-20 -mb-16 -mr-6 rounded bg-gray-700 bg-opacity-75">
          <span class="text-xs text-white">Delete forever</span>
        </div>
      </button>
      <button class="relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @click="restoreNote" @mouseover="showTooltip('restore')" @mouseleave="hideTooltip('restore')">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current icon icon-tabler icon-tabler-file-plus" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
          <line x1="12" y1="11" x2="12" y2="17" />
          <line x1="9" y1="14" x2="15" y2="14" />
        </svg>
        <div ref="restore" class="hidden absolute items-center justify-center w-12 -mb-16 -ml-0 rounded bg-gray-700 bg-opacity-75">
          <span class="text-xs text-white">Restore</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ColorSelector from './ColorSelector.vue'

export default {
  name: 'NoteCard',
  components: {
    ColorSelector
  },
  props: ['isTrashView', 'note', 'index', 'tags', 'isNoteOpened'],
  data () {
    return {
      isVisible: false,
      isSelected: false,
      isShownReminderSection: false,
      isShownColorSelector: false,
      isShownMoreSection: false,
      isShownLabelSection: false,
      label: ''
    }
  },
  computed: {
    ...mapGetters({
      getTag: 'getTag'
    })
  },
  methods: {
    showTooltip (elem) {
      this.$refs[elem].classList.remove('hidden')
      this.$refs[elem].classList.add('flex')
    },
    hideTooltip (elem) {
      this.$refs[elem].classList.remove('flex')
      this.$refs[elem].classList.add('hidden')
    },
    showClose (elem) {
      this.$refs[elem][0].classList.remove('hidden')
      this.$refs[elem][0].classList.add('flex')
    },
    hideClose (elem) {
      this.$refs[elem][0].classList.remove('flex')
      this.$refs[elem][0].classList.add('hidden')
    },
    selectNote () {
      this.isSelected = !this.isSelected
      const isPinned = (this.note.isPinned) ? 'pinned' : 'unpinned'
      if (this.isSelected) {
        this.$emit('select', isPinned + '-' + this.index)
      } else {
        this.$emit('unselect', isPinned + '-' + this.index)
      }
    },
    async archiveNote () {
      this.note.isArchived = !this.note.isArchived
      this.note.isPinned = false
      await this.$store.dispatch('updateNote', this.note)
      if (this.note.isArchived) {
        this.note.tagIds.forEach(async tId => {
          const tag = this.getTag(tId)
          await this.$store.dispatch('disconnectNoteFromTag', { note: this.note, tag: tag })
        })
        await this.$store.dispatch('archiveNote', this.note)
      } else {
        // TODO: unarchiveNote & connectNoteToTags
      }
    },
    async pinNote () {
      this.note.isPinned = !this.note.isPinned
      await this.$store.dispatch('updateNote', this.note)
    },
    async changeColor (obj) {
      this.note.currentColor = obj.selectedColor
      this.note.selectedIndexColor = obj.selectedIndexColor
      await this.$store.dispatch('updateNote', this.note)
    },
    async deleteNote () {
      this.note.tagIds.forEach(async tId => {
        const tag = this.getTag(tId)
        await this.$store.dispatch('disconnectNoteFromTag', { note: this.note, tag: tag })
      })
      await this.$store.dispatch('deleteNote', this.note)
      this.$emit('close')
      this.isShownMoreSection = false
    },
    async deleteNoteForever () {
      await this.$store.dispatch('deleteNoteForever', this.note)
      this.$emit('close')
    },
    async restoreNote () {
      const note = await this.copyNote()
      note.tagIds.forEach(async tId => {
        const tag = this.getTag(tId)
        await this.$store.dispatch('connectNoteToTag', { note: note, tag: tag })
      })
      await this.$store.dispatch('deleteNoteForever', this.note)
    },
    async copyNote () {
      const tagIds = this.note.tagIds
      const newNote = {
        title: this.note.title,
        content: this.note.content,
        tagIds: [],
        isPinned: this.note.isPinned,
        currentColor: this.note.currentColor,
        selectedIndexColor: this.note.selectedIndexColor
      }
      const savedNote = await this.$store.dispatch('createNote', newNote)
      tagIds.forEach(async tId => {
        const tag = this.getTag(tId)
        await this.$store.dispatch('connectTagToNote', { note: savedNote, tag: tag })
      })
      this.$emit('close')
      this.isShownMoreSection = false
      return savedNote
    },
    openLabelSection () {
      this.isShownMoreSection = false
      this.isShownLabelSection = true
    },
    async addTagToNote (tagId) {
      const tag = this.getTag(tagId)
      await this.$store.dispatch('connectTagToNote', { note: this.note, tag: tag })
    },
    async deleteTagFromNote (tagId) {
      const tag = this.getTag(tagId)
      await this.$store.dispatch('disconnectTagFromNote', { note: this.note, tag: tag })
    },
    selectTag (index, label) {
      this.$refs['check-' + index][0].checked = !this.$refs['check-' + index][0].checked
      if (this.$refs['check-' + index][0].checked) {
        // Add label
        this.addTagToNote(label.id)
      } else {
        // Remove label
        this.deleteTagFromNote(label.id)
      }
    },
    async createLabel () {
      const newLabel = {
        name: this.label
      }
      const tag = await this.$store.dispatch('createLabel', newLabel)
      this.addTagToNote(tag.id)
      // Clear input
      this.label = ''
      this.isShownLabelSection = false
    },
    close () {
      this.$store.dispatch('updateNote', this.note)
      this.$emit('close')
    }
  }
}
</script>
