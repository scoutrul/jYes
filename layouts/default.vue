<template lang="pug">
  .mainClass
    Alert
    nuxt
</template>
<script>
import Alert from '~/components/Alert'
export default {
  components: { Alert }
}
</script>
<style>
body {
  margin: 0;
}
.container {
  width: 100%;
  max-width: 640px;
}
.mainClass {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 200vh;
  justify-content: center;
  padding: 10px 0;
  background: #222c3c;
}
</style>
