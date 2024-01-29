<script>
import { RouterView, RouterLink } from 'vue-router'
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
    <navbar v-if="this.$route.name != 'home'"/>
    <RouterView  />
</template>

<style scoped>
</style>
