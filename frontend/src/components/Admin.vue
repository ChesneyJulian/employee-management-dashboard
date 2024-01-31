<script>
import NewEmployee from '@/components/NewEmployee.vue'
import NewDepartment from '@/components/NewDepartment.vue';
import NewLocation from '@/components/NewLocation.vue';
import ManagementDataService from '@/services/managementSystem'
import router from '@/router/index'

export default {
    name: 'AdminPortal',
    async mounted(){
        // once component is mounted, fetch all employee data and all project data and push each as object to employees array and projects array
        const employeeData = await ManagementDataService.fetchEmployees();
        employeeData.data.map((employee) => {
            this.employees.push({
                name: `${employee.firstName} ${employee.lastName}`,
                id: employee.id,
                department: employee.department.title
            })
        })
        const projectData = await ManagementDataService.fetchAllProjets();
        projectData.data.map((project) => {
            this.projects.push({
                title: project.title,
                id: project.id,
                description: project.description
            })
        })
    },  
    components: {
    NewEmployee,
    NewDepartment,
    NewLocation
    },
    data(){
        return {
            employees: [],
            projects: [],
        }
    },
    methods: {
        // method to route to employee info page when employee name is clicked
        goToEmployee(id){
            router.replace({path: `/info/${id}`})
        },
        // method to route to project details page when project is clicked
        goToProject(id) {
            router.replace({path: `/project-details/${id}`})
        }
    }
}
</script>

<template>
    <section>
    <v-card elevation="8">
        <v-expansion-panels multiple>
            <v-expansion-panel title="All Employees" >
                <template v-slot:text>
                    <!-- iterate over employees and render as list item within expansion panel -->
                    <v-list lines="two">
                        <v-list-item 
                        v-for="employee in employees"
                        @click="goToEmployee(employee.id)"
                        :title="employee.name"
                        :subtitle="employee.department"
                        ></v-list-item>
                    </v-list>
                </template>
            </v-expansion-panel>
            <v-expansion-panel title="All Projects">
                <template v-slot:text>
                    <v-list lines="three">
                        <!-- iterate over projects and render as list item within expansion panel -->
                        <v-list-item 
                        v-for="project in projects"
                        @click="goToProject(project.id)"
                        :title="project.title"
                        :subtitle="project.description"
                        ></v-list-item>
                    </v-list>
                </template>
        </v-expansion-panel>
    </v-expansion-panels>
    </v-card>
    <v-container>
        <!-- component with form to add new employee -->
        <NewEmployee />
        <!-- component with form to add new department -->
        <NewDepartment />
        <!-- component with form to add new location -->
        <NewLocation />
    </v-container>
    </section>
</template>

<style scoped>
.v-card {
    width: 80vw;
    margin-bottom: 44px;
}
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin-top: 52px;
  margin-bottom: 52px;
}

.v-container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}
</style>