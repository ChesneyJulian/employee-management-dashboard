<script>
import ManagementDataService from '../services/managementSystem'
import EditTaskForm from './EditTaskForm.vue';
import TaskForm from './TaskForm.vue';
import router from '../router/index'
export default {
    name: 'projectDetails',
    components: {
    EditTaskForm,
    TaskForm
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
            employees: []
        }
    },
    methods: {
        goToEmployee(id){
            router.replace({path: `/info/${id}`})
        },
        async getData(){
            const path = location.pathname.split('')
            this.projectId = parseInt(path[path.length - 1])
            const projectDetails = await ManagementDataService.fetchSingleProject(this.projectId);
            this.project.title = projectDetails.data.title
            this.project.description = projectDetails.data.description
            projectDetails.data.tasks.map((task) => {
                this.tasks.push({
                    tasks: task.title, 
                    description: task.description,
                    started: task.inProgress,
                    completed: task.completed,
                    edit: task.id
                })
            })
            projectDetails.data.employees.map((employee) => {
                this.employees.push({
                    name: `${employee.firstName} ${employee.lastName}`,
                    department: employee.department.title,
                    id: employee.id
                })
            })
        },
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

    <TaskForm :projectId="projectId"/>
</template>

<style scoped>
.v-card{
    width: 80vw;
    margin-bottom: 44px;
}




</style>