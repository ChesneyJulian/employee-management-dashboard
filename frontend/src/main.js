import '@/assets/main.css'
// import createApp from vue
import { createApp } from 'vue'
import App from '@/App.vue'
// import router file
import router from '@/router'
// Vuetify
import '@mdi/font/css/materialdesignicons.css' 
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import createStore from vuex for state management
import { createStore } from 'vuex'

// initialize vuetify with components, directives, and icons
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', 
  }
})

// initialize vuex store for state management
const store = createStore({
  state () {
    return {
      employeeId: null,
      name: '',
      departmentId: null,
      email: '',
      admin: null
    }
  },
  mutations: {
    // define method of assigning values to properties in store
    assign (state, { data }) {
      state.employeeId = data.id,
      state.name = data.firstName,
      state.departmentId = data.departmentId,
      state.email = data.email,
      state.admin = data.admin
    }
  }
})

// initialize vue app with App.vue file
const app = createApp(App)
// middleware directs app to use router file, vuetify, and store
app.use(router);
app.use(vuetify);
app.use(store);


app.mount('#app')
