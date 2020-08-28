<template>
  <div v-if="isModalOpen">
    <div class="fixed z-50 inset-0 mx-auto my-auto h-64 max-h-full w-full max-w-xs rounded-lg bg-black border border-white text-white text-sm">
      <div class="w-full px-4 my-3">
        <span class="text-lg font-bold">Edit labels</span>
      </div>
      <div class="flex flex-row items-center justify-between w-full px-4">
        <button class="flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-25">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-x" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <input class="w-48 ml-3 bg-transparent text-sm border-b border-gray-700" v-model="label" maxlength="50" name="label" id="label" type="text" placeholder="Create a new label name">
        <button class="flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-25">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-check" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M5 12l5 5l10 -10" />
          </svg>
        </button>
      </div>
      <div class="overflow-y-auto w-full h-32 mr-2">
        <div class="flex flex-row items-center justify-between w-full px-4 my-1" v-for="(label, index) in labels" :key="index">
          <button class="flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-25">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-tag" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M11 3L20 12a1.5 1.5 0 0 1 0 2L14 20a1.5 1.5 0 0 1 -2 0L3 11v-4a4 4 0 0 1 4 -4h4" />
              <circle cx="9" cy="9" r="2" />
            </svg>
          </button>
          <span class="w-48 ml-3">{{ label.name }}</span>
          <button class="flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-25">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-pencil" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
              <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex justify-end h-auto w-full border-t border-gray-700">
        <button class="mt-1 mr-1 px-6 py-1 rounded focus:outline-none hover:bg-gray-700 hover:bg-opacity-25">
          <span class="font-semibold">Done</span>
        </button>
      </div>
    </div>
    <div class="fixed z-40 inset-0 opacity-50 bg-black" @click="closeModal()"></div>
  </div>
</template>

<script>
export default {
  name: 'EditLabelsModal',
  props: ['isModalOpen', 'labels'],
  data () {
    return {
      label: ''
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeModal')
    }
  }
}
</script>

<style>

</style>
