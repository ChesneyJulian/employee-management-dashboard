<script>
import ManagementDataService from '@/services/managementSystem'
export default {
    name: 'NewEmployee',
    async mounted(){
      // once mounted, fetch all departments and push each as an object to departmentOptions array
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
            alert: false,
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
      // method to submit new user form to database
       async submitForm(){
       const employeeData = await  ManagementDataService.createEmployee(this.firstname, this.lastname, this.selectedDepartment, this.email, this.password, this.phoneNumber, this.admin);
       if (employeeData) {
         location.reload();
        } else {
          // set alert to true if new employee info was invalid
        this.alert = true;
       }
      }
    }
}
</script>

<template>
  <v-btn
   @click="dialog = true"
   class="bg-blue-darken-2"
   >
   Add Employee Account
  </v-btn>
    <v-dialog
      v-model="dialog"
      persistent
      width="auto"
    >
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
            <v-text-field hide-details="auto" label="Phone Number" :rules="[required]" placeholder="(111)222-3333" v-model="phoneNumber" type="input"></v-text-field>
          </v-responsive>
          <v-responsive class="mx-auto mb-4" min-width="344">
            <v-text-field hide-details="auto" label="Password" :rules="[required]" placeholder="Password" v-model="password" type="password"></v-text-field>
          </v-responsive>
          <!-- select menu iterates over department options and sets selected balue as selectedDepartment -->
          <v-select :items="departmentOptions" :item-props="true" label="Department" v-model="selectedDepartment" hint="New Employee Department" persistent-hint></v-select>
          <v-checkbox v-model="admin" label="Grant Admin Access"></v-checkbox>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
            color="red-darken-2"
            variant="text"
            @click="dialog = false"
            >
            Cancel
          </v-btn>
          <v-btn
          color="green-darken-2"
          variant="text"
          type="submit"
          >
          Save Employee Account
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <v-card>
      <v-alert
        v-model="alert"
        variant="tonal"
        closable
        close-label="Close Alert"
        color="red-lighten-1"
        title="Uh oh!"
      >
      The employee info entered is not valid.
      </v-alert>
    </v-card>
    </v-dialog>
</template>