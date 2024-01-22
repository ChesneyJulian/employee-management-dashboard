<script>
import { RouterLink, RouterView } from 'vue-router'
// import ManagementDataService from './services/managementSystem'
export default {
  name: "app",
  data() {
    return {

    }
  },
  methods: {
    // async getDepartments () {
    //   const departmentData = await ManagementDataService.getAllDepartments();
    //   const dataLength = departmentData.data.length;
    //   for (let i = 0; i < dataLength; i++) {
    //     console.log(departmentData.data[i]);
    //   }
    // }
  }
}

</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
