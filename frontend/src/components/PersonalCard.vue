<script>
import AuthServices from '../services/auth'
import ManagementDataService from '../services/managementSystem';

export default {
    name: 'personalCard',
    data() {
        return {
            dialog: false,
            employeeId: AuthServices.decodeToken().data.id,
            name: '',
            email: '',
            department: '',
            location: '',
            phoneNumber: '',
        }
    },
    async mounted(){
        const employeeData = await ManagementDataService.singleEmployeeInfo(this.employeeId);
        this.name = (`${employeeData.data.firstName} ${employeeData.data.lastName}`)
        this.email = employeeData.data.email;
        this.department = employeeData.data.department.title;
        this.location = employeeData.data.department.location.address;
        this.phoneNumber = employeeData.data.phoneNumber;
    },
    methods: {
        async editInfo() {
            const editInfo = await ManagementDataService.editEmployeeInfo(this.employeeId, this.phoneNumber, this.email);
            location.reload();
        }
    }
}

</script>

<template>
        <v-card elevation="8" >
            <template v-slot:title class="font-weight-bold">{{ name }}</template>
            <v-divider :thickness="8" ></v-divider>
            <v-list lines="one" class="ml-8">
                <v-list-item><strong class="mr-2">Email:</strong> {{ email }}</v-list-item>
                <v-list-item><strong class="mr-2">Phone:</strong> {{ phoneNumber }}</v-list-item>
                <v-list-item><strong class="mr-2">Department:</strong> {{ department }}</v-list-item>
                <v-list-item><strong class="mr-2">Office location:</strong> {{ location }}</v-list-item>
            </v-list>
        </v-card>
        <div>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
            >
              Edit Contact Info
            </v-btn>
          </template>
          <v-form @submit.prevent="editInfo()" >
            <v-card>
              <v-responsive class="mx-auto mb-4" min-width="344">
                <v-text-field hide-details="auto" label="Email" v-model="email" placeholder="Email" type="input"></v-text-field>
              </v-responsive>
              <v-responsive class="mx-auto" min-width="344">
                <v-text-field v-model="phoneNumber" label="Phone Number" placeholder="(000)000-000" type="input"></v-text-field>
              </v-responsive>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="red-darken-1"
                variant="text"
                @click="dialog = false"
                >
                Cancel
              </v-btn>
              <v-btn
              color="green-darken-1"
              variant="text"
              @click="dialog = false"
              type="submit"
              >
              edit info
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        </v-dialog>
      </v-row>
    </div>
</template>

<style scoped>
.v-card{
    width: 80vw;
    margin-bottom: 44px;
    /* line-height: 2em; */
}
</style>