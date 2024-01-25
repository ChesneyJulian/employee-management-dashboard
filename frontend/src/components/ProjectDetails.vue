<script>
import ManagementDataService from '../services/managementSystem'
import TaskForm from './TaskForm.vue'
export default {
    name: 'projectDetails',
    components: {
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
            tasks: []
        }
    },
    methods: {
        async getData(){
            const path = location.pathname.split('')
            const projectId = path[path.length - 1]
            const projectDetails = await ManagementDataService.fetchSingleProject(projectId);
            this.project.title = projectDetails.data.title
            this.project.description = projectDetails.data.description
            projectDetails.data.tasks.map((task) => {
                this.tasks.push({
                    task: task.title, 
                    description: task.description,
                    started: task.inProgress,
                    completed: task.completed,
                    edit: task.id
                })
            })
            console.log('project ', this.project);
            console.log('tasks ', this.tasks);
        },
        async editTask(taskId){
            console.log(taskId);
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
                <TaskForm></TaskForm>
            </template>
            
        </v-data-table>
    </v-card>

</template>

<style scoped>
.v-data-table{
    width: 80vw;
}

</style>