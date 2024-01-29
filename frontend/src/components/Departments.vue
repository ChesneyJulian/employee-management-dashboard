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
            employees: [],
            showDepartments: false,
            allDepartments: []
        }
    },
    async mounted(){
        const yourDepartment = await ManagementDataService.getYourDepartment(this.departmentId);
        this.departmentName = yourDepartment.data.title
        this.location = yourDepartment.data.location.address
        this.employeeParking = yourDepartment.data.location.employeeParking
        yourDepartment.data.employees.map((employee)=> {
            this.employees.push({
                name: `${employee.firstName} ${employee.lastName}`,
                id: employee.id
            })
        })
    },
    methods: {
        goToEmployee(id){
            router.replace({path: `/info/${id}`})
        },
        async getAllDepartments(){
            this.showDepartments = true;
            if (!this.allDepartments.length) {
                const departments = await ManagementDataService.getAllDepartments();
                departments.data.map((department) => {
                    this.allDepartments.push({
                        departmentName: department.title,
                        location: department.location.address,
                        employeeParking: department.location.employeeParking,
                        employees: department.employees.map((employee) => {
                            return {
                                name: `${employee.firstName} ${employee.lastName}`,
                                id: employee.id
                            }
                        })
                    })
                });
            }
        }
    }
}
</script>

<template>
    <v-card elevation="8" v-if="showDepartments === false" >
        <template v-slot:title class="font-weight-bold">{{ this.departmentName }}</template>
        <v-divider :thickness="8" ></v-divider>
        <v-list lines="one">
            <v-list-item><strong class="mr-2">Department Location:</strong> {{ location }}</v-list-item>
            <v-list-item v-if="employeeParking === true">Employee Parking available.</v-list-item>
            <v-list-item v-else>Employee Parking not available.</v-list-item>
            <v-expansion-panels class="mt-2">
                <v-expansion-panel elevation="0">
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
        <div v-if="showDepartments === true" class="mt-8">
            <v-card elevation="8"  v-for="department in allDepartments">
                <template v-slot:title class="font-weight-bold">{{ department.departmentName }}</template>
                <v-divider :thickness="8" ></v-divider>
                <v-list lines="one">
                    <v-list-item><strong class="mr-2">Department Location:</strong> {{ department.location }}</v-list-item>
                    <v-list-item v-if="department.employeeParking === true">Employee parking available.</v-list-item>
                    <v-list-item v-else>Employee parking not available.</v-list-item>
                </v-list>
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <template v-slot:title><strong>Employees</strong></template>
                            <template v-slot:text>
                                <v-list>
                                    <v-list-item
                                    v-for="employee in department.employees"
                                    @click="goToEmployee(employee.id)"
                                    :title="employee.name"
                                    ></v-list-item>
                                </v-list>
                            </template>
                        </v-expansion-panel>
                    </v-expansion-panels>
            </v-card>
        </div>
        <div class="mb-16">
            <v-row justify="center">
                <v-btn v-if="showDepartments === false" class="bg-blue-darken-2" @click="getAllDepartments()">
                    View All Departments
                </v-btn>
                <v-btn v-else class="bg-blue-darken-2" @click="showDepartments = false">
                    Hide Other Departments
                </v-btn>
            </v-row>
        </div>
</template>

<style scoped>
.v-card{
    width: 80vw;
    margin-bottom: 44px;
}

</style>