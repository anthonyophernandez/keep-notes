<template>
  <aside class="fixed inset-y-0 left-0 mt-16 bg-black" :class="(isMenuDisplayed) ? 'w-64 z-50' : 'w-20'" @mouseover="$store.dispatch('updateMenuDisplayed', true)" @mouseleave="$store.dispatch('updateMenuDisplayed', isMenuButtonPressed)">
    <div class="mt-2">
      <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass('1')]" @click="openNotesTab">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-bulb" :class="(isMenuDisplayed) ? 'mx-6' : ''" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <path d="M3 12h1M12 3v1M20 12h1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7" />
          <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
          <line x1="9.7" y1="17" x2="14.3" y2="17" />
        </svg>
        <span v-show="isMenuDisplayed">Notes</span>
      </button>
      <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass('2')]" @click="selectSection('2')">
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
      <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass('5')]" @click="selectSection('5')">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 stroke-current icon icon-tabler icon-tabler-archive" :class="(isMenuDisplayed) ? 'mx-6' : ''" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z"/>
          <rect x="3" y="4" width="18" height="4" rx="2" />
          <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
          <line x1="10" y1="12" x2="14" y2="12" />
        </svg>
        <span v-show="isMenuDisplayed">Archive</span>
      </button>
      <button class="flex items-center h-12 text-white focus:outline-none" :class="[(isMenuDisplayed) ? 'w-full rounded-r-full' : 'w-12 ml-4 justify-center rounded-full', selectedSectionClass('6')]" @click="selectSection('6')">
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SideMenu',
  props: ['isMenuDisplayed', 'isMenuButtonPressed', 'tags'],
  computed: {
    ...mapState({
      sectionSelected: state => state.sectionSelected
    })
  },
  methods: {
    selectedSectionClass (section) {
      return (this.sectionSelected === section) ? 'bg-yellow-500 bg-opacity-25' : 'hover:bg-gray-600 hover:bg-opacity-25'
    },
    openEditLabelsModal () {
      this.$emit('openEditLabelsModal')
      this.$store.dispatch('updateMenuDisplayed', !this.isMenuDisplayed)
    },
    openTagTab (tag, index) {
      this.selectSection('3-' + index)
      this.$router.push({ path: `/label/${tag.id}/${tag.name}` }).catch(() => {})
    },
    openNotesTab () {
      this.selectSection('1')
      this.$router.push({ path: '/' }).catch(() => {})
    },
    selectSection (section) {
      this.$store.dispatch('updateSection', section).catch(() => {})
    }
  }
}
</script>
