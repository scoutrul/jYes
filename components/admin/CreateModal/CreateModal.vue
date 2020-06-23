<template lang="pug">
  .modal(:class="{active : modalState}")
    .container
      slot
      gb-button(@click="closeModal").closeBtn x

</template>

<script>
import CreateTag from '@/components/admin/tags/CreateTag'
import helpers from '@/mixins/helpers.js'
export default {
  components: { CreateTag },
  mixins: [helpers],

  methods: {
    closeModal() {
      this.$store.commit('TOGGLE_CREATE_MODAL', false)
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 100;
  top: -100%;
  left: 0;
  min-width: 100vw;
  height: 100%;
  background-color: rgba(33, 43, 59, 0.74);
  opacity: 0;
}
.modal.active {
  top: 0;
  opacity: 1;
}
.modal .container {
  position: relative;
  padding: 40px;
  margin: 10vh auto auto;
  background-color: #546e98;
  opacity: 0;
  transition: 0.2s ease-out 0.1s;
}
.modal.active .container {
  opacity: 1;
}
.closeBtn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
