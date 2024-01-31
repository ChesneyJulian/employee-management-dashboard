<script>
import ManagementDataService from '@/services/managementSystem'
import router from '@/router';
export default {
    name: 'Departments',
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
    // when component is mounted, get info for user's department using departmentId in vuex store
    // use department data as value for properties in data
    async mounted(){
        const yourDepartment = await ManagementDataService.getYourDepartment(this.departmentId);
        this.departmentName = yourDepartment.data.title
        this.location = yourDepartment.data.location.address
        this.employeeParking = yourDepartment.data.location.employeeParking
        // iterate department employees and push into this.employees as objects containing employee name and id
        yourDepartment.data.employees.forEach((employee)=> {
            this.employees.push({
                name: `${employee.firstName} ${employee.lastName}`,
                id: employee.id
            })
        })
    },
    methods: {
        // method to route to employee's personal card when their name is clicked
        goToEmployee(id){
            router.replace({path: `/info/${id}`})
        },
        // method to get all department data ManagementDataService
        async getAllDepartments(){
            this.showDepartments = true;
            if (!this.allDepartments.length) {
                const departments = await ManagementDataService.getAllDepartments();
                departments.data.forEach((department) => {
                    this.allDepartments.push({
                        departmentName: department.title,
                        id: department.id,
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
        },
        // method to delete department by department id through ManagementDataService
        async deleteInfo(id) {
          const deleteDepartment = await ManagementDataService.deleteDepartment(id);
          location.reload();
        }
    }
}
</script>

<template>
    <!-- conditional rendering of employee's department if showDepartments is false -->
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
        <!-- conditionally render button to delete department if user has admin capabilities -->
            <v-btn
            v-if="this.$store.state.admin === true"
            class="bg-blue-darken-2 mt-2 mb-2 ml-4"
            @click="deleteInfo(this.departmentId)"
          >
            Delete Department
          </v-btn>
        </v-card>
        <!-- conditionally render cards for all departments if showDepartments is true -->
        <div v-if="showDepartments === true">
            <!-- make cards iteratively using allDepartments -->
            <v-card elevation="8"  v-for="department in allDepartments">
                <template v-slot:title class="font-weight-bold">{{ department.departmentName }}</template>
                <v-divider :thickness="8" ></v-divider>
                <v-list lines="one">
                    <v-list-item><strong class="mr-2">Department Location:</strong> {{ department.location }}</v-list-item>
                    <v-list-item v-if="department.employeeParking === true">Employee parking available.</v-list-item>
                    <v-list-item v-else>Employee parking not available.</v-list-item>
               
                    <v-expansion-panels>
                        <v-expansion-panel  elevation="0">
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
                </v-list>
                <!-- conditional rendering of delete department btn if user has admin capabilities -->
                    <v-btn
                        v-if="this.$store.state.admin === true"
                        class="bg-blue-darken-2 mt-2 mb-2 ml-4"
                        @click="deleteInfo(department.id)"
                    >
                        Delete Department
                    </v-btn>
            </v-card>
        </div>
        <div class="mb-16">
            <v-row justify="center">
                <!-- conditionally render buttons to show or hide all departments depending on showDepartments -->
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