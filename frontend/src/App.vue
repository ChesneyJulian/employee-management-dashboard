<script>
import { RouterView } from 'vue-router'
import AuthServices from './services/auth'
// import router from './router';
// import ManagementDataService from './services/managementSystem'
export default {
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
  <RouterView />
</template>

<style scoped>
</style>
