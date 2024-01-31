<script>
import router from '@/router/index';
import ManagementDataService from '@/services/managementSystem'
  export default {
  name:'ProjectTable',

  async mounted() {
    // once component is mounted, find employeeId from vuex store then fetch employee's projects
      const employeeId = this.$store.state.employeeId;
          const projectData = await ManagementDataService.fetchProjects(employeeId); 
          // iterate over employee's projects and push each as an object to this.projects in component data
          projectData.data.projects.forEach((project) => {
              this.projects.push({
                title: project.title, 
                description: project.description, 
                'Tasks Available': project.tasks.length, 
                details: project.id})
            });
      },
  data: () => ({
    projects:[],
  }),
  methods: {
    // method to route to project details page at projectId
    async toDetails(projectId) {
      router.push({ path: `/project-details/${projectId}`})
    }
  },
}
</script>

<template>
  <v-card elevation="8">
    <template v-slot:title class="text-h4 font-weight-bold">
            Your Projects
        </template >
        <v-divider :thickness="8" ></v-divider>
        <!-- use data-table to render data from projects -->
    <v-data-table :items="projects">
      <!-- create slot for details to hold link to project details -->
      <template v-slot:item.details="{ item }">
        <v-btn class="bg-blue-darken-2" density="compact" @click="toDetails(item.details)">View</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped>
.v-card{
  margin-bottom: 44px;
  width: 80vw;
}

</style>