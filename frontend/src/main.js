import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import '@mdi/font/css/materialdesignicons.css' 
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createStore } from 'vuex'


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', 
  }
})

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
    assign (state, { data }) {
      state.employeeId = data.id,
      state.name = data.firstName,
      state.departmentId = data.departmentId,
      state.email = data.email,
      state.admin = data.admin
    }
  }
})

const app = createApp(App)

app.use(router);
app.use(vuetify);
app.use(store);


app.mount('#app')
