<template>
  <div class="text-white">
    Name: {{ tag.name }}
    <br>
    Id: {{ tag.id }}
    <br>
    Label: {{ tag }}
    <div v-for="noteId in tag.noteIds" :key="noteId">
      {{ getNote(noteId).title }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Label',
  computed: {
    ...mapGetters({
      getTag: 'getTag',
      getNote: 'getNote'
    }),
    tag () {
      return this.getTag(this.$route.params.id)
    }
  }
}
</script>
