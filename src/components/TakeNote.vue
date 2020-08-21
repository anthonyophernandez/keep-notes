<template>
  <div class="relative flex flex-col w-full max-w-xl h-auto border border-gray-700 rounded-lg" :class="[currentColor, (currentColor === 'bg-black')? 'bg-opacity-100' : 'bg-opacity-25']">
    <div v-if="isVisible" class="absolute top-0 right-0">
      <button class="relative flex items-center justify-center w-8 h-8 mt-2 mr-1 rounded-full hover:bg-gray-600 hover:bg-opacity-25 hover:text-white focus:outline-none" :class="(isPinned) ? 'text-white' : 'text-gray-600'" @click="pinNote" @mouseover="showTooltip('pin-note')" @mouseleave="hideTooltip('pin-note')">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-current icon icon-tabler icon-tabler-anchor" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2" />
          <circle cx="12" cy="6" r="3" />
        </svg>
        <div ref="pin-note" class="hidden absolute items-center justify-center w-16 -mb-16 rounded bg-gray-700 bg-opacity-75">
          <span v-show="!isPinned" class="text-xs text-white">Pin note</span>
          <span v-show="isPinned" class="text-xs text-white">Unpin note</span>
        </div>
      </button>
    </div>
    <div class="w-full h-full my-2 pl-4 pr-10" @click="isVisible = true">
      <textarea v-if="isVisible" v-model="title" class="resize-y h-auto w-full mb-2 bg-transparent text-white text-lg font-bold placeholder-gray-500 focus:outline-none" placeholder="Title" rows="2"></textarea>
      <textarea v-model="content" class="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none" :class="(isVisible) ? 'h-auto resize-y font-normal text-base' : 'h-6 resize-none font-bold text-lg'" placeholder="Take a note..." :rows="(isVisible) ? '3' : '1'" ></textarea>
    </div>
    <div class="w-full px-2 mb-2">
      <div
        class="relative inline-block mx-1 mb-1 px-2 rounded-full border border-gray-700"
        v-for="(tag, index) in tags"
        :key="index"
        @mouseover="showClose('tag-' + index)"
        @mouseleave="hideClose('tag-' + index)"
      >
        <span class="cursor-pointer text-white text-xs">{{ tag }}</span>
        <button
          :ref="'tag-' + index"
          class="absolute top-0 right-0 hidden items-center justify-center bg-black text-gray-700 w-6 h-6 rounded-full hover:text-gray-500 hover:bg-gray-700 focus:outline-none"
          @click="deleteTag(index)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 stroke-current icon icon-tabler icon-tabler-x" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="isVisible" class="flex items-center justify-between w-full h-10 mt-2 mb-1 px-2">
      <div class="flex items-center">
        <button class="relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @mouseover="showTooltip('remind-me')" @mouseleave="hideTooltip('remind-me')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-bell" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
          </svg>
          <div ref="remind-me" class="hidden absolute items-center justify-center w-20 -mb-16 -mr-4 lg:mr-0 rounded bg-gray-700 bg-opacity-75">
            <span class="text-xs text-white">Remind me</span>
          </div>
        </button>
        <div class="relative">
          <ColorSelector v-if="isShownColorSelector" class="absolute -mt-20 -ml-6" :selectedIndexColor="selectedIndexColor" @changeColor="changeColor" @mouseleave.native="isShownColorSelector = false"/>
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
        <button class="relative flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @mouseover="showTooltip('archive')" @mouseleave="hideTooltip('archive')">
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
            <div ref="more" class="hidden z-50 absolute items-center justify-center px-1 -mb-16 rounded bg-gray-700 bg-opacity-75">
              <span class="text-xs text-white">More</span>
            </div>
          </button>
          <div class="absolute z-40 w-24 -ml-6 py-1 bg-black text-white border rounded" v-if="isShownMoreSection" @mouseleave="isShownMoreSection = false">
            <button class="w-full focus:outline-none hover:bg-gray-500 hover:bg-opacity-25" @click="openLabelSection">
              <span class="text-sm">Add label</span>
            </button>
          </div>
          <div class="absolute z-40 w-48 -ml-6 py-1 bg-black text-white border rounded" v-if="isShownLabelSection" @mouseleave="isShownLabelSection = false">
            <div class="w-full pl-2 pr-1 mb-3">
              <label for="label" class="text-sm">Label note</label>
              <input class="w-full bg-transparent text-xs" v-model="label" maxlength="50" name="label" id="label" type="text" placeholder="Enter label name">
            </div>
            <div v-for="(label, index) in labels" :key="index" class="flex items-center cursor-pointer w-full py-1 hover:bg-white hover:bg-opacity-25">
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
      <button class="px-3 h-8 rounded hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @click="close">Close</button>
    </div>
  </div>
</template>

<script>
import ColorSelector from './ColorSelector.vue'

export default {
  name: 'TakeNote',
  props: ['labels'],
  components: {
    ColorSelector
  },
  data () {
    return {
      isVisible: false,
      isPinned: false,
      isShownMoreSection: false,
      isShownColorSelector: false,
      isShownLabelSection: false,
      currentColor: 'bg-black',
      selectedIndexColor: 1,
      title: '',
      content: '',
      label: '',
      tags: []
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
    showClose (elem) {
      this.$refs[elem][0].classList.remove('hidden')
      this.$refs[elem][0].classList.add('flex')
    },
    hideClose (elem) {
      this.$refs[elem][0].classList.remove('flex')
      this.$refs[elem][0].classList.add('hidden')
    },
    changeColor (obj) {
      this.currentColor = obj.selectedColor
      this.selectedIndexColor = obj.selectedIndexColor
    },
    pinNote () {
      this.isPinned = !this.isPinned
    },
    clear () {
      this.isVisible = false
      this.isPinned = false
      this.title = ''
      this.content = ''
      this.currentColor = 'bg-black'
      this.selectedIndexColor = 1
      this.tags = []
    },
    close () {
      const note = {
        title: this.title,
        content: this.content,
        tags: this.tags,
        isPinned: this.isPinned,
        currentColor: this.currentColor,
        selectedIndexColor: this.selectedIndexColor
      }
      if (this.title.length > 0 || this.content.length > 0) {
        this.$store.dispatch('addNote', note)
      }
      this.clear()
    },
    deleteTag (index) {
      this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)]
    },
    openLabelSection () {
      this.isShownMoreSection = false
      this.isShownLabelSection = true
    },
    selectTag (index, label) {
      this.$refs['check-' + index][0].checked = !this.$refs['check-' + index][0].checked
      if (this.$refs['check-' + index][0].checked) {
        // Add label
        this.tags = [...[label.name], ...this.tags]
      } else {
        // Remove label
        const i = this.tags.indexOf(label.name)
        if (i !== -1) {
          this.deleteTag(i)
        }
      }
    },
    createLabel () {
      const newLabel = {
        name: this.label
      }
      this.$store.dispatch('addLabel', newLabel)
      this.tags = [...[newLabel.name], ...this.tags]
      // Clear input
      this.label = ''
      this.isShownLabelSection = false
    }
  }
}
</script>
