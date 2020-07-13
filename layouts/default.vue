<template lang="pug">
  .mainClass
    Alert
    LogIn
    nuxt
</template>

<script>
import Alert from '@/components/misc/Alert'
import LogIn from '@/components/misc/LogIn'

export default {
  components: {
    Alert,
    LogIn
  }
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
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 200vh;
  flex-direction: column;
  justify-content: center;
  justify-content: flex-start;
  padding: 10px 0;
  background: #a6cbe0;
}
</style>
