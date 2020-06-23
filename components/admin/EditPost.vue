<template lang="pug">
  div(v-if="isEditable")
    gb-heading(tag='h3') {{ doc.id }}
    gb-input(v-model="title" label="Заголовок")
    gb-textarea(v-model="body" label="Содержимое")
    gb-divider(color="blue")
    .tagList(v-if="tags.length")
      .tag(v-for="tag in tags" :key="tag.id")
        gb-checkbox(:label="tag.title" @change="selectTag(tag)" :value="tag.selected")
        gb-button(size='micro' color='red' @click="deleteTag({ id: tag.id})") x
    CreateTag
    gb-button(@click="updatePost" :disabled="$store.state.loading") Сохранить
    gb-button(@click="deleteDoc({ id: doc.id})" :disabled="$store.state.loading") Delete
</template>

<script>
import TagList from '~/components/admin/tags/TagList'
import CreateTag from '@/components/admin/tags/CreateTag'
import helpers from '~/mixins/helpers.js'
export default {
  components: { TagList, CreateTag },
  mixins: [helpers],
  props: {
    doc: {
      type: Object,
      default: () => {
        return {
          tags: [{}]
        }
      }
    }
  },
  data: () => ({
    tags: [],
    title: '',
    body: ''
  }),
  computed: {
    getTags() {
      return this.$store.state.docs.tags
    }
  },
  watch: {
    doc(val) {
      console.log('watch', val)
      this.tags = this.markSelectedTags(val.tags)
      this.title = val.title
      this.body = val.body
    },
    getTags(val) {
      console.log('getTags', val)
      this.tags = val
    }
  },
  methods: {
    markSelectedTags(tags = []) {
      const docTags = tags
      const tagList = this.$store.state.docs.tags
      return tagList.map((tag) => {
        const tempTag = { ...tag }
        tempTag.selected = docTags.some((_tag) => _tag.id === tag.id)
        return tempTag
      })
    },
    selectTag(selectedTag) {
      const tempTags = []
      this.tags.forEach((tag) => {
        const tempTag = { ...tag }
        if (tag.id === selectedTag.id) {
          tempTag.selected = !tempTag.selected
        }
        tempTags.push(tempTag)
      })
      this.tags = tempTags
    },
    async deleteTag({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'tags',
        id
      })
    },
    async deleteDoc({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'posts',
        id
      })
      this.isEditable = false
    },
    async updatePost() {
      const cleanTags = this.tags
        .filter((tag) => tag.selected)
        .map((tag) => {
          const tempTag = { ...tag }
          delete tempTag.selected
          return tempTag
        })
      await this.$store.dispatch('updateDoc', {
        ref: 'posts',
        doc: {
          ...this.doc,
          title: this.title,
          body: this.body,
          tags: cleanTags
        }
      })
    }
  }
}
</script>

<style scoped></style>
