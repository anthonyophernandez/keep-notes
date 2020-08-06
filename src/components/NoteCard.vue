<template>
  <div class="relative flex flex-col w-full max-w-xl h-full mx-auto border border-gray-700 rounded-lg" @mouseover="isVisible = true" @mouseleave="isVisible = false">
    <button class="relative flex items-center justify-center w-5 h-6 -mt-2 -ml-2 focus:outline-none" @mouseover="showTooltip('select-note')" @mouseleave="hideTooltip('select-note')">
      <svg v-show="isVisible" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 stroke-current bg-white rounded-full icon icon-tabler icon-tabler-check" viewBox="0 0 24 24" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <path d="M5 12l5 5l10 -10" />
      </svg>
      <div ref="select-note" class="hidden absolute items-center justify-center w-20 -mb-12 -mr-16 lg:mr-0 rounded bg-gray-700 bg-opacity-75">
        <span class="text-xs text-white break-normal">Select note</span>
      </div>
    </button>
    <div class="absolute top-0 right-0">
      <button class="relative flex items-center justify-center w-8 h-8 mt-2 mr-1 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none" @mouseover="showTooltip('pin-note')" @mouseleave="hideTooltip('pin-note')">
        <svg v-show="isVisible" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-current icon icon-tabler icon-tabler-anchor" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2" />
          <circle cx="12" cy="6" r="3" />
        </svg>
        <div ref="pin-note" class="hidden absolute items-center justify-center w-16 -mb-16 rounded bg-gray-700 bg-opacity-75">
          <span class="text-xs text-white">Pin note</span>
        </div>
      </button>
    </div>
    <div class="w-full h-full pl-4 pr-10">
      <h2 class="text-base text-white break-words font-bold">Title</h2>
      <div class="mt-2">
        <p class="text-sm text-white">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas.
          Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta?
          Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.
        </p>
      </div>
    </div>
    <div class="flex items-center justify-between w-full h-12 mb-1 px-2">
      <div v-show="isVisible" class="flex items-center">
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
      <!-- Close Button
      <button v-show="isVisible" class="px-3 h-8 rounded hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none">Close</button>
      -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoteCard',
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

<style>

</style>
