<template>
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
      <button class="hidden md:flex items-center justify-center w-10 h-10 mr-2 rounded hover:bg-gray-600 hover:bg-opacity-25 focus:outline-none text-gray-600 hover:text-white" @click="displayGrid">
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
</template>

<script>
export default {
  name: 'TopBar',
  props: ['isDisplayedGrid'],
  methods: {
    toggleMenu () {
      this.$emit('toggleMenu')
    },
    displayGrid () {
      this.$emit('displayGrid')
    }
  }
}
</script>
