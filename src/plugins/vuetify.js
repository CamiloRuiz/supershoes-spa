import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VAlert,
  VCard,
  VDialog,
  VForm,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VSelect,
  VTextField,
  VTextarea,
  VToolbar,
  VTooltip,
  transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VAlert,
    VCard,
    VDialog,
    VForm,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VSelect,
    VTextField,
    VTextarea,
    VToolbar,
    VTooltip,
    transitions
  },
  theme: {
    primary: '#1b499c',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
});
