<template>
    <p @click="getInfo()">Get info</p>
    <v-data-table :items="consoles">
      <template v-slot:item.exclusive="{ item }">
        <v-checkbox
          v-model="item.exclusive"
          readonly
        ></v-checkbox>
      </template>
    </v-data-table>
  </template>
  <script>
  import ManagementDataService from '../services/managementSystem'
    export default {
      name:'projectTable',
      data: () => ({
        
      }),
      methods: {
        async getInfo() {
            const employeeId = this.$store.state.employeeId;
            console.log('employeeId ', employeeId);
            const projectData = await ManagementDataService.fetchProjects(employeeId); 
            console.log(projectData);
        }
    },
    async beforeCreate() {

        }

    }
  </script>