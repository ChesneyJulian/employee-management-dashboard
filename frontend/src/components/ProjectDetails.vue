<script>
import ManagementDataService from '@/services/managementSystem'
import EditTaskForm from '@/components/EditTaskForm.vue';
import TaskForm from '@/components/TaskForm.vue';
import router from '@/router/index'

export default {
    name: 'ProjectDetails',
    components: {
    EditTaskForm,
    TaskForm,
},
    mounted(){
        this.getData();
    },
    data(){
        return {
            project: {
                title: '',
                description: '',
            },
            projectId: null,
            tasks: [],
            employees: [],
        }
    },
    methods: {
        goToEmployee(id){
            router.replace({path: `/info/${id}`})
        },
        // method to get project data using req.params projectId; set property values in component data to the project's data
        async getData(){
            const path = location.pathname.split('')
            this.projectId = parseInt(path[path.length - 1])

            const projectDetails = await ManagementDataService.fetchSingleProject(this.projectId);

            this.project.title = projectDetails.data.title
            this.project.description = projectDetails.data.description
            // iterate through project's tasks and push each to this.tasks array as an object
            projectDetails.data.tasks.forEach((task) => {
                this.tasks.push({
                    tasks: task.title, 
                    description: task.description,
                    started: task.inProgress,
                    completed: task.completed,
                    edit: task.id
                })
            })
            // iterate through project's employees and push each to this.employees array as an object
            projectDetails.data.employees.forEach((employee) => {
                this.employees.push({
                    name: `${employee.firstName} ${employee.lastName}`,
                    department: employee.department.title,
                    id: employee.id
                })
            })
        },
        // method to delete project by projectId
        async deleteInfo() {
          const deleteProject = await ManagementDataService.deleteProject(this.projectId);
          if (deleteProject) router.replace({path: `/admin`})
        }
    }
}
</script>

<template>
    <v-card elevation="8">
        <template v-slot:title class="text-h4 font-weight-bold">
            {{ project.title }}
        </template >
        <template v-slot:text class="text-subtitle-1 font-weight-medium">
            {{ project.description }}
        </template>
        <v-divider :thickness="8" ></v-divider>
        <!-- use data-table to iterate and display tasks data -->
        <v-data-table :items="tasks">
            <template v-slot:item.started="{ item }">
                <v-checkbox
                    readonly
                    v-model="item.started"
                ></v-checkbox>
            </template>
            <template v-slot:item.completed="{ item }">
                <v-checkbox
                    readonly
                    v-model="item.completed"
                ></v-checkbox>
            </template>
            <template v-slot:item.edit="{ item }">
                <!-- Component EditTaskForm with props defined by the current task being iterated -->
              <EditTaskForm :taskId="item.edit" :priorDescription="item.description" :priorStarted="item.started" :priorCompleted="item.completed"/>
            </template>
        </v-data-table>
        <v-divider :thickness="8" ></v-divider>
        <v-expansion-panels>
            <v-expansion-panel
                title="Employees"
                >
                <template v-slot:text>
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
        </v-expansion-panels>
    </v-card>
    <section>
        <!-- TaskForm component with props passed as projectId to allow creation of new tasks -->
        <TaskForm :projectId="projectId"/>
        
        <!-- conditionally render delete project btn for users with admin capabilities -->
        <v-btn
            v-if="this.$store.state.admin === true"
            class="bg-blue-darken-2 mx-4"
            @click="deleteInfo()"
          >
            Delete Project
        </v-btn>
    </section>

</template>

<style scoped>
.v-card{
    width: 80vw;
    margin-bottom: 44px;
}

section {
    display: flex; 
    width: 80vw;
    justify-content: center;
    align-items: center;
}



</style>