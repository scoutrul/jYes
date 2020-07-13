<template lang="pug">
  .modal(:class="{active : modalState(name)}")
    .container
      slot
      gb-button(@click="closeModal").closeBtn x

</template>

<script lang="ts">
import Vue from 'vue'
import CreateTag from '~/components/tags/CreateTag.vue'
import helpers from '~/mixins/helpers.js'

export default Vue.extend({
  components: { CreateTag },
  mixins: [helpers],
  props: {
    name: {
      type: String,
      validator(x) {
        return ['isCreateModal', 'isDeleteModal', ''].includes(x)
      },
      default: ''
    }
  },

  methods: {
    closeModal() {
      this.$store.commit('TOGGLE_MODAL', this.name)
    }
  }
})
</script>

<style scoped>
.modal {
  position: absolute;
  z-index: -1;
  top: -130%;
  left: 0;
  min-width: 100vw;
  height: 100%;
  background-color: rgba(33, 43, 59, 0.74);
  opacity: 0;
}
.modal.active {
  z-index: 1000;
  top: 0;
  opacity: 1;
}
.modal .container {
  position: relative;
  top: 10%;
  left: 50%;
  padding: 40px;
  background-color: #546e98;
  opacity: 0;
  transform: translateX(-50%);
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
