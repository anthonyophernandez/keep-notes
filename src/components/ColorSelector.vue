<template>
  <div class="grid grid-cols-4 gap-1 w-24 p-1 border border-gray-700 rounded">
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @mouseover="showTooltip('color-black')" @mouseleave="hideTooltip('color-black')">
      <div class="w-5 h-5 border border-gray-700 hover:border-white rounded-full bg-black"></div>
      <div ref="color-black" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Default</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @mouseover="showTooltip('color-red')" @mouseleave="hideTooltip('color-red')">
      <div class="w-5 h-5 border border-gray-700 hover:border-white rounded-full bg-red-600 bg-opacity-50"></div>
      <div ref="color-red" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Red</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @mouseover="showTooltip('color-orange')" @mouseleave="hideTooltip('color-orange')">
      <div class="w-5 h-5 border border-gray-700 hover:border-white rounded-full bg-orange-600 bg-opacity-50"></div>
      <div ref="color-orange" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Orange</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @mouseover="showTooltip('color-yellow')" @mouseleave="hideTooltip('color-yellow')">
      <div class="w-5 h-5 border border-gray-700 hover:border-white rounded-full bg-yellow-500 bg-opacity-50"></div>
      <div ref="color-yellow" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Yellow</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @mouseover="showTooltip('color-green')" @mouseleave="hideTooltip('color-green')">
      <div class="w-5 h-5 border border-gray-700 hover:border-white rounded-full bg-green-600 bg-opacity-50"></div>
      <div ref="color-green" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Green</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @mouseover="showTooltip('color-teal')" @mouseleave="hideTooltip('color-teal')">
      <div class="w-5 h-5 border border-gray-700 hover:border-white rounded-full bg-teal-500 bg-opacity-50"></div>
      <div ref="color-teal" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Teal</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @mouseover="showTooltip('color-blue')" @mouseleave="hideTooltip('color-blue')">
      <div class="w-5 h-5 border border-gray-700 hover:border-white rounded-full bg-blue-500 bg-opacity-50"></div>
      <div ref="color-blue" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Blue</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @mouseover="showTooltip('color-darkblue')" @mouseleave="hideTooltip('color-darkblue')">
      <div class="w-5 h-5 border border-gray-700 hover:border-white rounded-full bg-blue-700 bg-opacity-50"></div>
      <div ref="color-darkblue" class="hidden absolute items-center justify-center w-16 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Dark blue</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @mouseover="showTooltip('color-purple')" @mouseleave="hideTooltip('color-purple')">
      <div class="w-5 h-5 border border-gray-700 hover:border-white rounded-full bg-purple-600 bg-opacity-50"></div>
      <div ref="color-purple" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Purple</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @mouseover="showTooltip('color-pink')" @mouseleave="hideTooltip('color-pink')">
      <div class="w-5 h-5 border border-gray-700 hover:border-white rounded-full bg-pink-600 bg-opacity-50"></div>
      <div ref="color-pink" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Pink</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @mouseover="showTooltip('color-brown')" @mouseleave="hideTooltip('color-brown')">
      <div class="w-5 h-5 border border-gray-700 hover:border-white rounded-full bg-orange-900 bg-opacity-50"></div>
      <div ref="color-brown" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Brown</span>
      </div>
    </button>
    <button class="relative flex items-center justify-center w-5 h-5 rounded-full focus:outline-none" @mouseover="showTooltip('color-gray')" @mouseleave="hideTooltip('color-gray')">
      <div class="w-5 h-5 border border-gray-700 hover:border-white rounded-full bg-gray-600 bg-opacity-50"></div>
      <div ref="color-gray" class="hidden absolute items-center justify-center w-10 -mb-12 rounded bg-gray-700 bg-opacity-75">
        <span class="z-50 text-xs text-white">Gray</span>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ColorSelector'
}
</script>
