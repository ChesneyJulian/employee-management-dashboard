<script>
import { RouterView } from 'vue-router'
import AuthServices from './services/auth'
import navbar from './components/Navigation.vue'

export default {
  components: {
    navbar
  },
  mounted(){
    // decode jwt which will return employee data or false
    // allows info to be stored again when page is reloaded
    const userInfo = AuthServices.decodeToken();
    if (userInfo) {
      this.$store.commit({
        type: 'assign',
        data: userInfo.data
      })
    };
  },
  name: "app",
  data() {
    return {}
  },
  methods: {}
}
</script>

  <template>
    <v-app light>
      <navbar v-if="this.$route.name != 'home'"/>
      <RouterView  />
    </v-app>
  </template>

<style>
</style>
