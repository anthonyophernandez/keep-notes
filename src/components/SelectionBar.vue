<template>
    <div v-show="selectedNotes.length > 0" class="absolute inset-x-0 top-0 z-50 flex items-center justify-between h-16 bg-black border-b border-gray-700">
      <div class="flex items-center ml-5">
        <button class="relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @click="clearSelection" @mouseover="showTooltip('clear-selection')" @mouseleave="hideTooltip('clear-selection')">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current icon icon-tabler icon-tabler-x" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <div ref="clear-selection" class="hidden absolute items-center justify-center w-10 -mb-16 rounded bg-gray-700 bg-opacity-75">
            <span class="text-xs text-white">Clear</span>
          </div>
        </button>
        <h3 class="text-xl text-white ml-2">{{ selectedNotes.length }} selected</h3>
      </div>
      <div v-if="!isTrashView" class="flex items-center mr-5">
        <button class="relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @click="pinNotes" @mouseover="showTooltip('pin')" @mouseleave="hideTooltip('pin')">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current icon icon-tabler icon-tabler-anchor" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2" />
            <circle cx="12" cy="6" r="3" />
          </svg>
          <div ref="pin" class="hidden absolute items-center justify-center w-8 -mb-16 rounded bg-gray-700 bg-opacity-75">
            <span class="text-xs text-white">Pin</span>
          </div>
        </button>
        <div class="relative">
          <button class="relative flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @click="isShownReminderSection = true" @mouseover="showTooltip('remind-me')" @mouseleave="hideTooltip('remind-me')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-bell" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
              <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
            </svg>
            <div ref="remind-me" class="hidden absolute items-center justify-center w-20 -mb-16 -mr-4 lg:mr-0 rounded bg-gray-700 bg-opacity-75">
              <span class="text-xs text-white">Remind me</span>
            </div>
          </button>
          <div class="absolute z-40 w-48 -ml-8 py-1 bg-black text-white border rounded" v-if="isShownReminderSection" @mouseleave="isShownReminderSection = false">
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
        </div>
        <div class="relative">
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
          <ColorSelector v-if="isShownColorSelector" class="absolute -mb-24 -ml-6" @changeColor="changeColor" @mouseleave.native="isShownColorSelector = false"/>
        </div>
        <button class="relative flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @click="archiveNotes" @mouseover="showTooltip('archive')" @mouseleave="hideTooltip('archive')">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current icon icon-tabler icon-tabler-archive" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <rect x="3" y="4" width="18" height="4" rx="2" />
            <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
            <line x1="10" y1="12" x2="14" y2="12" />
          </svg>
          <div ref="archive" class="hidden absolute items-center justify-center px-1 -mb-16 rounded bg-gray-700 bg-opacity-75">
            <span v-if="!isArchiveView" class="text-xs text-white">Archive</span>
            <span v-else class="text-xs text-white">Unarchive</span>
          </div>
        </button>
        <div class="relative">
          <button class="relative flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @click="isShownMoreSection =! isShownMoreSection" @mouseover="showTooltip('more')" @mouseleave="hideTooltip('more')">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current icon icon-tabler icon-tabler-dots-vertical" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="19" r="1" />
              <circle cx="12" cy="5" r="1" />
            </svg>
            <div ref="more" class="hidden absolute z-50 items-center justify-center px-1 -mb-16 rounded bg-gray-700 bg-opacity-75">
              <span class="text-xs text-white">More</span>
            </div>
          </button>
          <div class="absolute z-40 w-24 -ml-16 py-1 bg-black text-white border rounded" v-if="isShownMoreSection" @mouseleave="isShownMoreSection = false">
            <button class="w-full focus:outline-none hover:bg-gray-500 hover:bg-opacity-25" @click="deleteNotes">
              <span class="text-sm">Delete notes</span>
            </button>
            <button class="w-full focus:outline-none hover:bg-gray-500 hover:bg-opacity-25" @click="openLabelSection">
              <span class="text-sm">Add label</span>
            </button>
            <button class="w-full focus:outline-none hover:bg-gray-500 hover:bg-opacity-25" @click="copyNotes">
              <span class="text-sm">Make a copy</span>
            </button>
          </div>
          <div class="absolute z-40 w-48 -ml-40 py-1 bg-black text-white border rounded" v-if="isShownLabelSection" @mouseleave="isShownLabelSection = false">
            <div class="w-full pl-2 pr-1 mb-3">
              <label for="label" class="text-sm">Label note</label>
              <input class="w-full bg-transparent text-xs" v-model="label" maxlength="50" name="label" id="label" type="text" placeholder="Enter label name">
            </div>
            <div v-for="(label, index) in tags" :key="index" class="flex items-center cursor-pointer w-full py-1 hover:bg-white hover:bg-opacity-25">
              <input :ref="'check-' + index" class="h-3 w-3 ml-2 mr-2 cursor-pointer appearance-none border checked:bg-white" type="checkbox" name="select-tag" id="select-tag">
              <span class="w-full text-sm text-white" @click="selectTag(index, label)">{{ label.name }}</span>
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
        </div>
      </div>
      <div v-else class="flex items-center mr-5 text-white">
        <button class="relative flex items-center justify-center w-8 h-8 mr-3 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @click="deleteNotesForever" @mouseover="showTooltip('delete-forever')" @mouseleave="hideTooltip('delete-forever')">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current icon icon-tabler icon-tabler-trash" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
          <div ref="delete-forever" class="hidden absolute items-center justify-center w-20 -mb-16 rounded bg-gray-700 bg-opacity-75">
            <span class="text-xs text-white">Delete forever</span>
          </div>
        </button>
        <button class="relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @click="restoreNotes" @mouseover="showTooltip('restore')" @mouseleave="hideTooltip('restore')">
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
import ColorSelector from '../components/ColorSelector.vue'
export default {
  name: 'SelectionBar',
  props: ['isTrashView', 'isArchiveView', 'selectedNotes', 'tags'],
  components: {
    ColorSelector
  },
  data () {
    return {
      isShownReminderSection: false,
      isShownColorSelector: false,
      isShownMoreSection: false,
      isShownLabelSection: false,
      label: ''
    }
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
    clearSelection () {
      this.$emit('clearSelection')
    },
    pinNotes () {
      this.$emit('pinNotes')
    },
    archiveNotes () {
      this.$emit('archiveNotes')
    },
    changeColor (obj) {
      this.$emit('changeColor', obj)
    },
    deleteNotes () {
      this.$emit('deleteNotes')
    },
    deleteNotesForever () {
      this.$emit('deleteNotesForever')
    },
    restoreNotes () {
      this.$emit('restoreNotes')
    },
    copyNotes () {
      this.$emit('copyNotes')
    },
    openLabelSection () {
      this.isShownMoreSection = false
      this.isShownLabelSection = true
    },
    createLabel () {
      this.$emit('createLabel', this.label)
      this.label = ''
      this.isShownLabelSection = false
    },
    selectTag (index, label) {
      this.$refs['check-' + index][0].checked = !this.$refs['check-' + index][0].checked
      const isChecked = this.$refs['check-' + index][0].checked
      this.$emit('selectTag', { isChecked: isChecked, label: label })
    }
  }
}
</script>
