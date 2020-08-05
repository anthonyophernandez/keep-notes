<template>
  <div class="relative w-full h-full">
    <header class="w-full h-16">
      <div class="flex items-center justify-between w-full h-full border-b border-gray-700">
        <button class="flex items-center justify-center w-10 h-10 ml-5 rounded hover:bg-gray-600 hover:bg-opacity-25 focus:outline-none focus:bg-gray-600 focus:bg-opacity-25" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current text-white icon icon-tabler icon-tabler-menu" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="4" y1="8" x2="20" y2="8" />
            <line x1="4" y1="16" x2="20" y2="16" />
          </svg>
        </button>
        <div class="relative w-full max-w-md mx-2">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current text-gray-600 icon icon-tabler icon-tabler-search" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </span>
          <input class="w-full pl-10 pr-4 py-2 bg-gray-600 bg-opacity-25 rounded-lg focus:outline-none focus:bg-gray-200 placeholder-gray-600" type="text" placeholder="Search">
        </div>
        <button class="flex items-center justify-center w-10 h-10 mr-2 rounded hover:bg-gray-600 hover:bg-opacity-25 focus:outline-none text-gray-600 hover:text-white" @click="toggleMenu">
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
    <aside class="fixed inset-y-0 left-0 mt-16 bg-black" :class="(isMenuDisplayed) ? 'w-64 z-50' : 'w-20'" @mouseover="isMenuDisplayed = true" @mouseleave="isMenuDisplayed = isPressed">
      <div class="mt-2">
        <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass(1)]" @click="isSectionSelected = 1">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-bulb" :class="(isMenuDisplayed) ? 'mx-6' : ''" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M3 12h1M12 3v1M20 12h1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7" />
            <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
            <line x1="9.7" y1="17" x2="14.3" y2="17" />
          </svg>
          <span v-show="isMenuDisplayed">Notes</span>
        </button>
        <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass(2)]" @click="isSectionSelected = 2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-bell" :class="(isMenuDisplayed) ? 'mx-6' : ''" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
            <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
          </svg>
          <span v-show="isMenuDisplayed">Reminders</span>
        </button>
        <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass(3)]" @click="isSectionSelected = 3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-tag" :class="(isMenuDisplayed) ? 'mx-6' : ''" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M11 3L20 12a1.5 1.5 0 0 1 0 2L14 20a1.5 1.5 0 0 1 -2 0L3 11v-4a4 4 0 0 1 4 -4h4" />
            <circle cx="9" cy="9" r="2" />
          </svg>
          <span v-show="isMenuDisplayed">#Tag 1</span>
        </button>
        <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass(4)]" @click="isSectionSelected = 4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-pencil" :class="(isMenuDisplayed) ? 'mx-6' : ''" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
          </svg>
          <span v-show="isMenuDisplayed">Edit labels</span>
        </button>
        <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass(5)]" @click="isSectionSelected = 5">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-archive" :class="(isMenuDisplayed) ? 'mx-6' : ''" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <rect x="3" y="4" width="18" height="4" rx="2" />
            <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
            <line x1="10" y1="12" x2="14" y2="12" />
          </svg>
          <span v-show="isMenuDisplayed">Archive</span>
        </button>
        <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass(6)]" @click="isSectionSelected = 6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-trash" :class="(isMenuDisplayed) ? 'mx-6' : ''" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
          </svg>
          <span v-show="isMenuDisplayed">Bin</span>
        </button>
      </div>
    </aside>
    <main class="fixed inset-0 px-2 mt-16 overflow-y-auto" :class="(isMenuDisplayed) ? 'ml-20 sm:ml-64 z-40' : 'ml-20'">
      <div class="relative flex flex-col w-full max-w-xl h-auto mx-auto mt-2 border border-gray-700 rounded-lg">
        <button class="absolute top-0 right-0 flex items-center justify-center w-8 h-8 mt-2 mr-1 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-current icon icon-tabler icon-tabler-anchor" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2" />
            <circle cx="12" cy="6" r="3" />
          </svg>
        </button>
        <div class="w-full h-full mt-2 pl-4 pr-10">
          <input class="w-full mb-2 bg-transparent text-white text-lg font-bold placeholder-gray-500" type="text" placeholder="Title">
          <input class="w-full bg-transparent text-white placeholder-gray-500" type="text" placeholder="Take a note...">
        </div>
        <div class="flex items-center justify-between w-full h-10 mt-2 mb-1 px-2">
          <div class="flex items-center">
            <button class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-bell" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>
                <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
              </svg>
            </button>
            <button class="flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-palette" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>
                <path d="M12 21a9 9 0 1 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
                <circle cx="7.5" cy="10.5" r=".5" fill="currentColor" />
                <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
                <circle cx="16.5" cy="10.5" r=".5" fill="currentColor" />
              </svg>
            </button>
            <button class="flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current icon icon-tabler icon-tabler-archive" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>
                <rect x="3" y="4" width="18" height="4" rx="2" />
                <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
                <line x1="10" y1="12" x2="14" y2="12" />
              </svg>
            </button>
            <button class="flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current icon icon-tabler icon-tabler-dots-vertical" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="19" r="1" />
                <circle cx="12" cy="5" r="1" />
              </svg>
            </button>
          </div>
          <button class="px-3 h-8 rounded hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none">Close</button>
        </div>
      </div>
      <div class="grid gap-3 mt-2" :class="(isDisplayedGrid) ? 'xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1' : 'grid-cols-1'">
        <div class="relative flex flex-col w-full max-w-xl h-full mx-auto border border-gray-700 rounded-lg" v-for="index in 14" :key="index">
          <button class="flex items-center justify-center w-5 h-6 -mt-2 -ml-2 bg-white rounded-full focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 stroke-current icon icon-tabler icon-tabler-check" viewBox="0 0 24 24" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M5 12l5 5l10 -10" />
            </svg>
          </button>
          <button class="absolute top-0 right-0 flex items-center justify-center w-8 h-8 mt-2 mr-1 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-current icon icon-tabler icon-tabler-anchor" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M12 9v12m-8 -8a8 8 0 0 0 16 0m1 0h-2m-14 0h-2" />
              <circle cx="12" cy="6" r="3" />
            </svg>
          </button>
          <div class="w-full h-full pl-4 pr-10">
            <h2 class="text-base text-white break-words font-bold">Title #{{ index }}</h2>
            <div class="mt-2">
              <p class="text-sm text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, officia! Repudiandae exercitationem hic voluptates facere in est, aliquid inventore, quia quidem dolores, quos enim explicabo. Adipisci ea expedita dignissimos quas.
                Nam aliquid enim nulla sed praesentium nesciunt, exercitationem iste eveniet, beatae a, impedit fuga? Quis nisi, ullam sint fuga delectus assumenda voluptatum quam commodi, modi error quibusdam consequuntur facere soluta?
                Doloremque quod suscipit, laudantium nisi, quis dolorem a atque soluta illo voluptatum eaque quos minus explicabo ab corrupti adipisci voluptatem, illum modi qui? Consequuntur possimus repellendus eius, aspernatur optio accusamus.
              </p>
            </div>
          </div>
          <div class="flex items-center justify-between w-full h-12 mb-1 px-2">
            <div class="flex items-center">
              <button class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-bell" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                </svg>
              </button>
              <button class="flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-palette" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <path d="M12 21a9 9 0 1 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
                  <circle cx="7.5" cy="10.5" r=".5" fill="currentColor" />
                  <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
                  <circle cx="16.5" cy="10.5" r=".5" fill="currentColor" />
                </svg>
              </button>
              <button class="flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current icon icon-tabler icon-tabler-archive" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <rect x="3" y="4" width="18" height="4" rx="2" />
                  <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
                  <line x1="10" y1="12" x2="14" y2="12" />
                </svg>
              </button>
              <button class="flex items-center justify-center w-8 h-8 ml-2 rounded-full hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 stroke-current icon icon-tabler icon-tabler-dots-vertical" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="19" r="1" />
                  <circle cx="12" cy="5" r="1" />
                </svg>
              </button>
            </div>
            <button class="px-3 h-8 rounded hover:bg-gray-600 hover:bg-opacity-25 text-gray-600 hover:text-white focus:outline-none">Close</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  data () {
    return {
      isDisplayedGrid: false,
      isMenuDisplayed: false,
      isPressed: false,
      isSectionSelected: -1
    }
  },
  methods: {
    selectedSectionClass (index) {
      return (this.isSectionSelected === index) ? 'bg-yellow-500 bg-opacity-25' : 'hover:bg-gray-600 hover:bg-opacity-25'
    },
    toggleMenu () {
      this.isPressed = !this.isPressed
      this.isMenuDisplayed = !this.isMenuDisplayed
    }
  }
}
</script>
