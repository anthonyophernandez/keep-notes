<template>
  <div class="relative flex flex-col w-full max-w-xl h-auto border border-gray-700 rounded-lg">
    <div v-if="isVisible" class="absolute top-0 right-0">
      <button class="relative flex items-center justify-center w-8 h-8 mt-2 mr-1 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @mouseover="showTooltip('pin-note')" @mouseleave="hideTooltip('pin-note')">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-current icon icon-tabler icon-tabler-anchor" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2" />
          <circle cx="12" cy="6" r="3" />
        </svg>
        <div ref="pin-note" class="hidden absolute items-center justify-center w-16 -mb-16 rounded bg-gray-700 bg-opacity-75">
          <span class="text-xs text-white">Pin note</span>
        </div>
      </button>
    </div>
    <div class="w-full h-full my-2 pl-4 pr-10" @click="isVisible = true">
      <textarea v-if="isVisible" class="resize-y h-auto w-full mb-2 bg-transparent text-white text-lg font-bold placeholder-gray-500 focus:outline-none" placeholder="Title" rows="2"></textarea>
      <textarea ref="textarea-note" class="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none" :class="(isVisible) ? 'h-auto resize-y font-normal text-base' : 'h-6 resize-none font-bold text-lg'" placeholder="Take a note..." :rows="(isVisible) ? '3' : '1'" ></textarea>
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
        <button class="relative flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @mouseover="showTooltip('change-color')" @mouseleave="hideTooltip('change-color')">
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
        <button class="relative flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @mouseover="showTooltip('more')" @mouseleave="hideTooltip('more')">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current icon icon-tabler icon-tabler-dots-vertical" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="19" r="1" />
            <circle cx="12" cy="5" r="1" />
          </svg>
          <div ref="more" class="hidden absolute items-center justify-center px-1 -mb-16 rounded bg-gray-700 bg-opacity-75">
            <span class="text-xs text-white">More</span>
          </div>
        </button>
      </div>
      <button class="px-3 h-8 rounded hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @click="isVisible = false">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TakeNote',
  data () {
    return {
      isVisible: false
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
    }
  }
}
</script>
