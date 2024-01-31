<script>
import { RouterView } from 'vue-router'
import AuthServices from './services/auth'
import navbar from './components/Navigation.vue'
// import ManagementDataService from './services/managementSystem'
export default {
  components: {
    navbar
  },
  mounted(){
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
