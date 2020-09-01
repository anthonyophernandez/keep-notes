<template>
  <div v-if="isModalOpen">
    <div class="fixed z-50 inset-0 mx-auto my-auto h-64 max-h-full w-full max-w-xs rounded-lg bg-black border border-white text-white text-sm">
      <div class="w-full px-4 my-3">
        <span class="text-lg font-bold">Edit labels</span>
      </div>
      <div class="flex flex-row items-center justify-between w-full px-4">
        <button v-show="isCreateStatus" class="relative flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-25" @click="cancel" @mouseover="showTooltip('cancel')" @mouseleave="hideTooltip('cancel')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-x" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <div ref="cancel" class="hidden absolute items-center justify-center -mb-16 mr-0 rounded bg-gray-700 bg-opacity-75" :class="(isCreateStatus) ? 'w-12' : 'w-20'">
            <span class="text-xs text-white">Cancel</span>
          </div>
        </button>
        <button v-show="!isCreateStatus" class="relative flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-25" @click="isCreateStatus = true" @mouseover="showTooltip('create-label-1')" @mouseleave="hideTooltip('create-label-1')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-plus" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <div ref="create-label-1" class="hidden absolute items-center justify-center -mb-16 ml-6 rounded bg-gray-700 bg-opacity-75" :class="(isCreateStatus) ? 'w-12' : 'w-20'">
            <span class="text-xs text-white">Create label</span>
          </div>
        </button>
        <input class="w-48 ml-3 bg-transparent text-sm border-gray-700" :class="(isCreateStatus) ? 'border-b' : null" v-model="label" maxlength="50" name="label" id="label" type="text" placeholder="Create a new label" @click="isCreateStatus = true">
        <button v-show="isCreateStatus" class="relative flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-25" @click="createLabel" @mouseover="showTooltip('create-label-2')" @mouseleave="hideTooltip('create-label-2')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-check" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z"/>
            <path d="M5 12l5 5l10 -10" />
          </svg>
          <div ref="create-label-2" class="hidden absolute items-center justify-center w-20 -mb-16 mr-6 rounded bg-gray-700 bg-opacity-75">
            <span class="text-xs text-white">Create label</span>
          </div>
        </button>
        <div v-show="!isCreateStatus" class="w-8 h-8"></div>
      </div>
      <div class="w-full h-32 overflow-y-auto">
        <div :ref="'label-' + index" class="flex flex-row items-center justify-between w-full px-4 my-1" v-for="(label, index) in labels" :key="index" @mouseover="deleteStatus(index, true)" @mouseleave="deleteStatus(index, false)">
          <button :ref="'tagIcon-' + index" class="flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-25">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-tag" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M11 3L20 12a1.5 1.5 0 0 1 0 2L14 20a1.5 1.5 0 0 1 -2 0L3 11v-4a4 4 0 0 1 4 -4h4" />
              <circle cx="9" cy="9" r="2" />
            </svg>
          </button>
          <button :ref="'binIcon-' + index" class="relative hidden items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-25" @click="deleteTag(label)" @mouseover="showOthersTooltip('delete-label-' + index)" @mouseleave="hideOthersTooltip('delete-label-' + index)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-trash" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
            <div :ref="'delete-label-' + index" class="hidden absolute items-center justify-center w-20 -mb-12 ml-6 rounded bg-gray-700 bg-opacity-75">
              <span class="text-xs text-white">Delete label</span>
            </div>
          </button>
          <span :ref="'labelName-' + index" class="cursor-text w-48 ml-3" @click="editStatus(index, true, label)">{{ label.name }}</span>
          <input :ref="'inputName-' + index" class="hidden w-48 ml-3 bg-transparent text-sm border-gray-700 border-b" v-model="labelInput" type="text">
          <button :ref="'penIcon-' + index" class="relative flex items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-25" @click="editStatus(index, true, label)" @mouseover="showOthersTooltip('rename-label-' + index)" @mouseleave="hideOthersTooltip('rename-label-' + index)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-pencil" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
              <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
            </svg>
            <div :ref="'rename-label-' + index" class="hidden absolute items-center justify-center w-20 -mb-12 mr-6 rounded bg-gray-700 bg-opacity-75">
              <span class="text-xs text-white">Rename label</span>
            </div>
          </button>
          <button :ref="'checkIcon-' + index" class="relative hidden items-center justify-center w-8 h-8 rounded-full focus:outline-none hover:bg-white hover:bg-opacity-25" @click="editStatus(index, false, label)" @mouseover="showOthersTooltip('rename-label-' + index)" @mouseleave="hideOthersTooltip('rename-label-' + index)">
            <svg v-show="isEditStatus" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current icon icon-tabler icon-tabler-check" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"/>
              <path d="M5 12l5 5l10 -10" />
            </svg>
            <div :ref="'rename-label-' + index" class="hidden absolute items-center justify-center w-20 -mb-12 mr-6 rounded bg-gray-700 bg-opacity-75">
              <span class="text-xs text-white">Rename label</span>
            </div>
          </button>
        </div>
        <div class="w-full h-4"></div>
      </div>
      <div class="flex justify-end h-auto w-full border-t border-gray-700">
        <button class="mt-1 mr-1 px-6 py-1 rounded focus:outline-none hover:bg-gray-700 hover:bg-opacity-25" @click="done">
          <span class="font-semibold">Done</span>
        </button>
      </div>
    </div>
    <div class="fixed z-40 inset-0 opacity-50 bg-black" @click="closeModal()"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EditLabelsModal',
  props: ['isModalOpen', 'labels'],
  data () {
    return {
      isCreateStatus: false,
      isEditStatus: true,
      label: '',
      labelInput: '',
      lastIndex: -1,
      lastLabel: {}
    }
  },
  computed: {
    ...mapGetters({
      getNote: 'getNote'
    })
  },
  methods: {
    async editStatus (index, editStatus, label) {
      if (this.lastIndex !== index && this.lastIndex !== -1) {
        await this.editStatus(this.lastIndex, false, this.lastLabel)
      }
      if (editStatus) {
        this.labelInput = label.name
        this.$refs['penIcon-' + index][0].classList.remove('flex')
        this.$refs['penIcon-' + index][0].classList.add('hidden')
        this.$refs['checkIcon-' + index][0].classList.remove('hidden')
        this.$refs['checkIcon-' + index][0].classList.add('flex')
        this.$refs['labelName-' + index][0].classList.remove('flex')
        this.$refs['labelName-' + index][0].classList.add('hidden')
        this.$refs['inputName-' + index][0].classList.remove('hidden')
        this.$refs['inputName-' + index][0].classList.add('flex')
        this.lastIndex = index
        this.lastLabel = label
      } else {
        if (this.labelInput !== label.name) {
          label.name = this.labelInput
          await this.$store.dispatch('updateTag', label)
        }
        this.$refs['penIcon-' + index][0].classList.remove('hidden')
        this.$refs['penIcon-' + index][0].classList.add('flex')
        this.$refs['checkIcon-' + index][0].classList.remove('flex')
        this.$refs['checkIcon-' + index][0].classList.add('hidden')
        this.$refs['inputName-' + index][0].classList.remove('flex')
        this.$refs['inputName-' + index][0].classList.add('hidden')
        this.$refs['labelName-' + index][0].classList.remove('hidden')
        this.$refs['labelName-' + index][0].classList.add('flex')
        this.lastIndex = -1
        this.lastLabel = ''
      }
    },
    deleteStatus (index, deleteStatus) {
      if (deleteStatus) {
        this.$refs['tagIcon-' + index][0].classList.remove('flex')
        this.$refs['tagIcon-' + index][0].classList.add('hidden')
        this.$refs['binIcon-' + index][0].classList.remove('hidden')
        this.$refs['binIcon-' + index][0].classList.add('flex')
      } else {
        this.$refs['tagIcon-' + index][0].classList.remove('hidden')
        this.$refs['tagIcon-' + index][0].classList.add('flex')
        this.$refs['binIcon-' + index][0].classList.remove('flex')
        this.$refs['binIcon-' + index][0].classList.add('hidden')
      }
    },
    async closeModal () {
      this.label = ''
      if (this.labelInput !== this.lastLabel.name) {
        this.lastLabel.name = this.labelInput
        await this.$store.dispatch('updateTag', this.lastLabel)
      }
      this.labelInput = ''
      this.lastIndex = -1
      this.lastLabel = {}
      this.$emit('closeModal')
    },
    cancel () {
      this.isCreateStatus = false
      this.label = ''
    },
    async done () {
      await this.createLabel()
      this.closeModal()
    },
    showTooltip (elem) {
      this.$refs[elem].classList.remove('hidden')
      this.$refs[elem].classList.add('flex')
    },
    hideTooltip (elem) {
      this.$refs[elem].classList.remove('flex')
      this.$refs[elem].classList.add('hidden')
    },
    showOthersTooltip (elem) {
      this.$refs[elem][0].classList.remove('hidden')
      this.$refs[elem][0].classList.add('flex')
    },
    hideOthersTooltip (elem) {
      this.$refs[elem][0].classList.remove('flex')
      this.$refs[elem][0].classList.add('hidden')
    },
    async createLabel () {
      if (this.label.length > 0) {
        const newLabel = {
          name: this.label
        }
        await this.$store.dispatch('createLabel', newLabel)
        // Clear input
        this.label = ''
      }
    },
    async deleteTag (tag) {
      await tag.noteIds.forEach(nid => {
        this.$store.dispatch('disconnectTagFromNote', { note: this.getNote(nid), tag: tag })
      })
      await this.$store.dispatch('deleteTag', tag)
    }
  }
}
</script>

<style>

</style>
