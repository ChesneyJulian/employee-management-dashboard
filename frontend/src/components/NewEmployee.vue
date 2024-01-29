<script>
import ManagementDataService from '../services/managementSystem'
export default {
    name: 'NewEmployee',
    async mounted(){
       const departments = await ManagementDataService.getAllDepartments();
       departments.data.map((department) => {
            this.departmentOptions.push({
                title: department.title,
                value: department.id
            })
        })
      },
    data(){
        return {
            dialog: false,
            departmentOptions: [],
            selectedDepartment: null,
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            phoneNumber: null,
            admin: false,
            required (v) {
                    return !!v || 'Field is required'
                },  
        }
    },
    methods: {
       async submitForm(){
        console.log(this.firstname, this.lastname, this.email, this.phoneNumber, this.password, this.selectedDepartment, this.admin);
       const employeeData = await  ManagementDataService.createEmployee(this.firstname, this.lastname, this.selectedDepartment, this.email, this.password, this.phoneNumber, this.admin);
       console.log(employeeData); 
       if (employeeData) {
        alert('Employee added to database.')
        location.reload();
       }
      }
    }
}
</script>

<template>
        <v-dialog
          v-model="dialog"
          persistent
          width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-btn
            @click="active = goal"
            class="bg-blue-darken-2"
              v-bind="props"
            >
              Add Employee Account
            </v-btn>
          </template>
          <v-form @submit.prevent="submitForm()" >
            <v-card>
              <v-responsive class="mx-auto mb-4" min-width="344">
                <v-text-field hide-details="auto" label="First Name" :rules="[required]" placeholder="First Name" v-model="firstname" type="input"></v-text-field>
              </v-responsive>
              <v-responsive class="mx-auto mb-4" min-width="344">
                <v-text-field hide-details="auto" label="Last Name" :rules="[required]" placeholder="Last Name" v-model="lastname" type="input"></v-text-field>
              </v-responsive>
              <v-responsive class="mx-auto mb-4" min-width="344">
                <v-text-field hide-details="auto" label="Email" :rules="[required]" placeholder="Email" v-model="email" type="email"></v-text-field>
              </v-responsive>
              <v-responsive class="mx-auto mb-4" min-width="344">
                <v-text-field hide-details="auto" label="Phone Number" :rules="[required]" placeholder="(800)100-200" v-model="phoneNumber" type="input"></v-text-field>
              </v-responsive>
              <v-responsive class="mx-auto mb-4" min-width="344">
                <v-text-field hide-details="auto" label="Password" :rules="[required]" placeholder="Password" v-model="password" type="password"></v-text-field>
              </v-responsive>
              <v-select :items="departmentOptions" :item-props="true" label="Department" v-model="selectedDepartment" hint="New Employee Department" persistent-hint></v-select>
              <v-checkbox v-model="admin" label="Grant Admin Access"></v-checkbox>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="red-darken-1"
                variant="text"
                @click="dialog = false; goal = null"
                >
                Cancel
              </v-btn>
              <v-btn
              color="green-darken-1"
              variant="text"
              @click="dialog = false"
              type="submit"
              >
              Add Employee Account
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        </v-dialog>
</template>