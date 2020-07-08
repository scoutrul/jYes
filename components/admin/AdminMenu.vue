<template lang="pug">
    div
      gb-heading(
        tag="h6"
        color="white"
        v-for="category in $store.state.admin.categories"
        :key="category.ref"
        @click="setCategory(category.ref)"
        :class="{active : (category.ref === $store.state.admin.activeCategory)}") {{ category.name }}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    setCategory(ref: String) {
      this.$store.commit('SET_CATEGORY', ref)
      this.$store.commit('SET_EDIT_DOC', {})
    }
  }
})
</script>

<style scoped>
.menu .active {
  background: darkslategrey;
}
</style>
