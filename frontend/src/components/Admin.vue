<script>
import NewEmployee from './NewEmployee.vue'
import NewDepartment from './NewDepartment.vue';
import NewLocation from './NewLocation.vue';
import ManagementDataService from '../services/managementSystem'
import router from '../router/index'
export default {
    name: 'adminPortal',
    async mounted(){
        const employeeData = await ManagementDataService.fetchEmployees();
        employeeData.data.map((employee) => {
            this.employees.push({
                name: `${employee.firstName} ${employee.lastName}`,
                id: employee.id,
                department: employee.department.title
            })
        })
        const projectData = await ManagementDataService.fetchAllProjets();
        console.log('projects ',projectData)
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
            projects: []
        }
    },
    methods: {
        goToEmployee(id){
            router.replace({path: `/info/${id}`})
        },
        goToProject(id) {
            router.replace({path: `/project-details/${id}`})
        }
    }
}
</script>

<template>
    <section>
    <v-card elevation="8">
        <v-expansion-panels>
            <v-expansion-panel
            title="All Employees"
            >
            <template v-slot:text>
                <v-list lines="three">
                    <v-list-item 
                    v-for="employee in employees"
                    @click="goToEmployee(employee.id)"
                    :title="employee.name"
                    :subtitle="employee.department"
                    ></v-list-item>
                </v-list>

            </template>
        </v-expansion-panel>
            <v-expansion-panel
            title="All Projects"
            >
            <template v-slot:text>
                <v-list lines="three">
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
        <NewEmployee />
        <NewDepartment />
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
  flex-wrap: wrap;
  min-width: 100vw;
  min-height: 70vh;
  justify-content: center;
  align-items: center;
}

.v-container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}
</style>