<template>
  <div class="grid grid-cols-4 gap-1 w-24 p-1 bg-black border border-gray-700 rounded">
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @click="changeColor(1, 'bg-black')" @mouseover="showTooltip('color-black')" @mouseleave="hideTooltip('color-black')">
      <div class="w-5 h-5 border hover:border-white rounded-full bg-black" :class="selectedClass(1)"></div>
      <div ref="color-black" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Default</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @click="changeColor(2, 'bg-red-600')" @mouseover="showTooltip('color-red')" @mouseleave="hideTooltip('color-red')">
      <div class="w-5 h-5 border hover:border-white rounded-full bg-red-600 bg-opacity-50" :class="selectedClass(2)"></div>
      <div ref="color-red" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Red</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @click="changeColor(3, 'bg-orange-600')" @mouseover="showTooltip('color-orange')" @mouseleave="hideTooltip('color-orange')">
      <div class="w-5 h-5 border hover:border-white rounded-full bg-orange-600 bg-opacity-50" :class="selectedClass(3)"></div>
      <div ref="color-orange" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Orange</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @click="changeColor(4, 'bg-yellow-500')" @mouseover="showTooltip('color-yellow')" @mouseleave="hideTooltip('color-yellow')">
      <div class="w-5 h-5 border hover:border-white rounded-full bg-yellow-500 bg-opacity-50" :class="selectedClass(4)"></div>
      <div ref="color-yellow" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Yellow</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @click="changeColor(5, 'bg-green-600')" @mouseover="showTooltip('color-green')" @mouseleave="hideTooltip('color-green')">
      <div class="w-5 h-5 border hover:border-white rounded-full bg-green-600 bg-opacity-50" :class="selectedClass(5)"></div>
      <div ref="color-green" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Green</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @click="changeColor(6, 'bg-teal-500')" @mouseover="showTooltip('color-teal')" @mouseleave="hideTooltip('color-teal')">
      <div class="w-5 h-5 border hover:border-white rounded-full bg-teal-500 bg-opacity-50" :class="selectedClass(6)"></div>
      <div ref="color-teal" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Teal</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @click="changeColor(7, 'bg-blue-500')" @mouseover="showTooltip('color-blue')" @mouseleave="hideTooltip('color-blue')">
      <div class="w-5 h-5 border hover:border-white rounded-full bg-blue-500 bg-opacity-50" :class="selectedClass(7)"></div>
      <div ref="color-blue" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Blue</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @click="changeColor(8, 'bg-blue-700')" @mouseover="showTooltip('color-darkblue')" @mouseleave="hideTooltip('color-darkblue')">
      <div class="w-5 h-5 border hover:border-white rounded-full bg-blue-700 bg-opacity-50" :class="selectedClass(8)"></div>
      <div ref="color-darkblue" class="hidden absolute items-center justify-center w-16 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Dark blue</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @click="changeColor(9, 'bg-purple-600')" @mouseover="showTooltip('color-purple')" @mouseleave="hideTooltip('color-purple')">
      <div class="w-5 h-5 border hover:border-white rounded-full bg-purple-600 bg-opacity-50" :class="selectedClass(9)"></div>
      <div ref="color-purple" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Purple</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @click="changeColor(10, 'bg-pink-600')" @mouseover="showTooltip('color-pink')" @mouseleave="hideTooltip('color-pink')">
      <div class="w-5 h-5 border hover:border-white rounded-full bg-pink-600 bg-opacity-50" :class="selectedClass(10)"></div>
      <div ref="color-pink" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Pink</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @click="changeColor(11, 'bg-orange-900')" @mouseover="showTooltip('color-brown')" @mouseleave="hideTooltip('color-brown')">
      <div class="w-5 h-5 border hover:border-white rounded-full bg-orange-900 bg-opacity-50" :class="selectedClass(11)"></div>
      <div ref="color-brown" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Brown</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @click="changeColor(12, 'bg-gray-600')" @mouseover="showTooltip('color-gray')" @mouseleave="hideTooltip('color-gray')">
      <div class="w-5 h-5 border hover:border-white rounded-full bg-gray-600 bg-opacity-50" :class="selectedClass(12)"></div>
      <div ref="color-gray" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Gray</span>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ColorSelector',
  props: {
    selectedIndexColor: {
      type: Number,
      default: 1
    }
  },
  computed: {
    selectedIndex: {
      get: function () {
        return this.selectedIndexColor
      },
      set: function (newValue) {
        return newValue
      }
    }
  },
  methods: {
    selectedClass (index) {
      return (index === this.selectedIndex) ? 'border-white' : 'border-gray-700'
    },
    changeColor (index, color) {
      this.selectedIndex = index
      this.$emit('changeColor', { selectedColor: color, selectedIndexColor: index })
    },
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
