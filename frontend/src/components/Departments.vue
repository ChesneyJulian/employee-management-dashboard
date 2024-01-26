<script>
import ManagementDataService from '../services/managementSystem'
import router from '../router';
export default {
    name: 'departments',
    data () {
        return {
            departmentId: this.$store.state.departmentId,
            departmentName: '',
            location: '',
            employeeParking: '',
            employees: []
        }
    },
    async mounted(){
        const yourDepartment = await ManagementDataService.getYourDepartment(this.departmentId);
        console.log(yourDepartment);
        this.departmentName = yourDepartment.data.title
        this.location = yourDepartment.data.location.address
        this.employeeParking = yourDepartment.data.location.employeeParking
        yourDepartment.data.employees.map((employee)=> {
            this.employees.push({
                name: `${employee.firstName} ${employee.lastName}`,
                id: employee.id
            })
        })

        console.log(this.location, this.employeeParking, this.employees)
    },
    methods: {
        goToEmployee(id){
            router.replace({path: `/info/${id}`})
        }
    }
}

</script>

<template>
    <v-card elevation="8">
        <template v-slot:title class="font-weight-bold">{{ this.departmentName }}</template>
        <v-divider :thickness="8" ></v-divider>
            <v-list lines="one">
                <v-list-item><strong class="mr-2">Department Location:</strong> {{ location }}</v-list-item>
                <v-list-item v-if="employeeParking === true">Employee Parking available.</v-list-item>
                <v-list-item v-else><strong class="mr-2">Employee Parking not available.</strong></v-list-item>
                <v-expansion-panels class="mt-2">
                    <v-expansion-panel>
                        <template v-slot:title><strong>Employees</strong></template>
                        <template v-slot:text>
                            <v-list>
                                <v-list-item
                                    v-for="employee in employees"
                                    @click="goToEmployee(employee.id)"
                                    :title="employee.name"
                                ></v-list-item>
                            </v-list>
                        </template>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-list>
    </v-card>
</template>

<style scoped>
.v-card{
    width: 80vw;
    margin-bottom: 44px;
}
</style>