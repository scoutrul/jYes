<template lang="pug">
  div
    gb-button(size='micro' color='green' :full-width="true") Добавить
    gb-divider(color="yellow")
    .doc(v-for="doc in docs" :key="doc.id")
      gb-heading(tag="h6" color="orange") {{ doc.title }}
      gb-heading(tag="small" color="grey") {{ dateFormat(doc.timestamp) }}
      gb-divider(color="yellow")
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: ['docs'],
  computed: {
    dateFormat() {
      return (date) => {
        return dayjs(date).format('DD/MM/YYYY')
      }
    }
  }
}
</script>

<style scoped></style>
