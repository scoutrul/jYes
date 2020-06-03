import Vue from 'vue'
import VueDarkMode from '@growthbunker/vuedarkmode'

Vue.use(VueDarkMode, {
  // Specify the theme to use: dark or light (dark by default).
  theme: 'dark',

  // Specify the components to declare globally in your project
  // When undefined, null or given an empty array, all components will be imported
  components: [
    // Base components
    'alert',
    'avatar',
    'badge',
    'button',
    'divider',
    'heading',
    'icon',
    'progress-bar',
    'spinner',

    // Field components
    'checkbox',
    'file',
    'image-uploader',
    'input',
    'input-numeric',
    'label',
    'message',
    'radios',
    'select',
    'tabs',
    'textarea',
    'toggle'
  ]
})
