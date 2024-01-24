<template>
    <v-data-table :items="projects">
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
    async beforeCreate() {
        const employeeId = this.$store.state.employeeId;
            const projectData = await ManagementDataService.fetchProjects(employeeId); 
            projectData.data.projects.map((project) => {
                this.projects.push({title: project.title, description: project.description, 'Tasks Available': project.tasks.length})
            });
        },
    data: () => ({
        projects:[]
    }),
    methods: {},
    

    }
  </script>