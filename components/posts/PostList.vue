<template lang="pug">
    .posts
      .post(v-for="post in posts")
        gb-heading(tag='h3') {{post.title}}
          div(v-for="content in post.content" :key="content.id")
            VueCodeHighlight(v-if="content.isCode") {{ convertBody(content.body)}}
            .body(v-else v-html="content.body")
        TagList(:tags="post.tags")
        gb-divider(size="large" color="turquoise")
</template>

<script lang="ts">
import Vue from 'vue'
import { component as VueCodeHighlight } from 'vue-code-highlight'
import TagList from '~/components/tags/TagList.vue'
import 'vue-code-highlight/themes/prism-tomorrow.css'
import 'vue-code-highlight/themes/window.css'

export default Vue.extend({
  components: { TagList, VueCodeHighlight },
  props: ['posts'],
  methods: {
    convertBody(body: String) {
      return body
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&amp;/gi, '&')
    }
  }
})
</script>

<style>
pre[class*='language-'] {
  display: flex !important;
  width: 100% !important;
  min-height: 400px;
  max-height: 90vh;
}
pre code {
  font-size: 1rem;
}
</style>
