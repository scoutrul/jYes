import Vue from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'

if (process.client) {
  Vue.use(CKEditor)
}
