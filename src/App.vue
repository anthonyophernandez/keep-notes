<template>
  <div id="app" class="w-full min-h-screen bg-black">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  async created () {
    await this.$store.dispatch('loadAllTags')
    await this.$store.dispatch('loadAllNotes')
  }
}
</script>script

<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
