<script>
import router from '../router/index';
import ManagementDataService from '../services/managementSystem'
  export default {
  name:'projectTable',
  async beforeCreate() {
      const employeeId = this.$store.state.employeeId;
          const projectData = await ManagementDataService.fetchProjects(employeeId); 
          console.log(projectData);
          projectData.data.projects.map((project) => {
              this.projects.push({title: project.title, description: project.description, 'Tasks Available': project.tasks.length, details: project.id})
            });
            console.log(this.projects);
      },
  data: () => ({
    projects:[],
  }),
  methods: {
    async toDetails(projectId) {
      router.push({ path: `/project-details/${projectId}`})
    }
  },
}
</script>
<template>
  <v-card elevation="8">
    <v-data-table :items="projects">
      <template v-slot:item.details="{ item }">
        <v-btn density="compact" @click="toDetails(item.details)">View</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped>
section {
  width: 75vw;
}

</style>