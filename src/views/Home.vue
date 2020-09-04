<template>
  <div class="relative w-full h-full">
    <header class="w-full h-16">
      <div class="flex items-center md:justify-between w-full h-full border-b border-gray-700">
        <button class="flex items-center justify-center w-10 h-10 ml-5 rounded hover:bg-gray-600 hover:bg-opacity-25 focus:outline-none focus:bg-gray-600 focus:bg-opacity-25" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current text-white icon icon-tabler icon-tabler-menu" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="4" y1="8" x2="20" y2="8" />
            <line x1="4" y1="16" x2="20" y2="16" />
          </svg>
        </button>
        <div class="relative w-full md:max-w-md mx-6">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current text-gray-600 icon icon-tabler icon-tabler-search" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </span>
          <input class="w-full pl-10 pr-4 py-2 bg-gray-600 bg-opacity-25 rounded-lg focus:outline-none focus:bg-gray-200 placeholder-gray-600" type="text" placeholder="Search">
        </div>
        <button class="hidden md:flex items-center justify-center w-10 h-10 mr-2 rounded hover:bg-gray-600 hover:bg-opacity-25 focus:outline-none text-gray-600 hover:text-white" @click="isDisplayedGrid = !isDisplayedGrid">
          <svg v-show="isDisplayedGrid" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-grid" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <rect x="4" y="4" width="6" height="6" rx="1" />
            <rect x="14" y="4" width="6" height="6" rx="1" />
            <rect x="4" y="14" width="6" height="6" rx="1" />
            <rect x="14" y="14" width="6" height="6" rx="1" />
          </svg>
          <svg v-show="!isDisplayedGrid" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-layout-rows" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <line x1="4" y1="12" x2="20" y2="12" />
          </svg>
        </button>
      </div>
    </header>
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
      <div class="flex items-center mr-5">
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
            <span class="text-xs text-white">Archive</span>
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
    </div>
    <aside class="fixed inset-y-0 left-0 mt-16 bg-black" :class="(isMenuDisplayed) ? 'w-64 z-50' : 'w-20'" @mouseover="isMenuDisplayed = true" @mouseleave="isMenuDisplayed = isMenuButtonPressed">
      <div class="mt-2">
        <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass('1')]" @click="isSectionSelected = '1'">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-bulb" :class="(isMenuDisplayed) ? 'mx-6' : ''" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M3 12h1M12 3v1M20 12h1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7" />
            <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
            <line x1="9.7" y1="17" x2="14.3" y2="17" />
          </svg>
          <span v-show="isMenuDisplayed">Notes</span>
        </button>
        <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass('2')]" @click="isSectionSelected = '2'">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-bell" :class="(isMenuDisplayed) ? 'mx-6' : ''" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
          </svg>
          <span v-show="isMenuDisplayed">Reminders</span>
        </button>
        <div v-for="(tag, index) in tags" :key="index">
          <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass('3-' + index)]" @click="openTagTab(tag, index)">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-tag" :class="(isMenuDisplayed) ? 'mx-6' : ''" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M11 3L20 12a1.5 1.5 0 0 1 0 2L14 20a1.5 1.5 0 0 1 -2 0L3 11v-4a4 4 0 0 1 4 -4h4" />
              <circle cx="9" cy="9" r="2" />
            </svg>
            <span v-show="isMenuDisplayed">{{ tag.name }}</span>
          </button>
        </div>
        <button class="flex items-center h-12 text-white focus:outline-none hover:bg-gray-600 hover:bg-opacity-25" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full']" @click="openEditLabelsModal">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-pencil" :class="(isMenuDisplayed) ? 'mx-6' : ''" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
          </svg>
          <span v-show="isMenuDisplayed">Edit labels</span>
        </button>
        <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass('5')]" @click="isSectionSelected = '5'">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-archive" :class="(isMenuDisplayed) ? 'mx-6' : ''" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <rect x="3" y="4" width="18" height="4" rx="2" />
            <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
            <line x1="10" y1="12" x2="14" y2="12" />
          </svg>
          <span v-show="isMenuDisplayed">Archive</span>
        </button>
        <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass('6')]" @click="isSectionSelected = '6'">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-trash" :class="(isMenuDisplayed) ? 'mx-6' : ''" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
          <span v-show="isMenuDisplayed">Trash</span>
        </button>
      </div>
    </aside>
    <MainSection ref="main" @selection="setSelection" :notes="notes" :tags="tags" :isMenuDisplayed="isMenuDisplayed" :isDisplayedGrid="isDisplayedGrid"/>
    <EditLabelsModal :isModalOpen="isEditLabelsModalOpened" :labels="tags" @closeModal="isEditLabelsModalOpened = false"/>
  </div>
</template>

<script>
import MainSection from '../components/MainSection.vue'
import ColorSelector from '../components/ColorSelector.vue'
import EditLabelsModal from '../components/EditLabelsModal.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    ColorSelector,
    MainSection,
    EditLabelsModal
  },
  data () {
    return {
      isDisplayedGrid: false,
      isMenuDisplayed: false,
      isMenuButtonPressed: false,
      isEditLabelsModalOpened: false,
      isSectionSelected: '1',
      selectedNotes: [],
      isShownReminderSection: false,
      isShownColorSelector: false,
      isShownMoreSection: false,
      isShownLabelSection: false,
      label: ''
    }
  },
  computed: {
    ...mapState({
      notes: state => state.notes,
      tags: state => state.tags
    })
  },
  methods: {
    selectedSectionClass (section) {
      return (this.isSectionSelected === section) ? 'bg-yellow-500 bg-opacity-25' : 'hover:bg-gray-600 hover:bg-opacity-25'
    },
    toggleMenu () {
      this.isMenuButtonPressed = !this.isMenuButtonPressed
      this.isMenuDisplayed = !this.isMenuDisplayed
    },
    openEditLabelsModal () {
      this.isEditLabelsModalOpened = true
      this.isMenuDisplayed = !this.isMenuDisplayed
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
    showTooltip (elem) {
      this.$refs[elem].classList.remove('hidden')
      this.$refs[elem].classList.add('flex')
    },
    hideTooltip (elem) {
      this.$refs[elem].classList.remove('flex')
      this.$refs[elem].classList.add('hidden')
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
    openLabelSection () {
      this.isShownMoreSection = false
      this.isShownLabelSection = true
    },
    selectTag (index, label) {
      this.$refs['check-' + index][0].checked = !this.$refs['check-' + index][0].checked
      if (this.$refs['check-' + index][0].checked) {
        // Add label
        this.selectedNotes.forEach(elem => {
          if (this.$refs.main.$refs['note-' + elem][0].note.tagIds.indexOf(label.id) === -1) {
            this.$refs.main.$refs['note-' + elem][0].addTagToNote(label.id)
          }
        })
      } else {
        // Remove label
        this.selectedNotes.forEach(elem => {
          if (this.$refs.main.$refs['note-' + elem][0].note.tagIds.indexOf(label.id) !== -1) {
            this.$refs.main.$refs['note-' + elem][0].deleteTagFromNote(label.id)
          }
        })
      }
    },
    async createLabel () {
      const newLabel = {
        name: this.label
      }
      const tag = await this.$store.dispatch('createLabel', newLabel)
      this.selectedNotes.forEach(elem => {
        this.$refs.main.$refs['note-' + elem][0].addTagToNote(tag.id)
      })
      this.label = ''
    },
    openTagTab (tag, index) {
      this.isSectionSelected = '3-' + index
      this.$router.push({ path: `/label/${tag.id}/${tag.name}` })
    }
  }
}
</script>
