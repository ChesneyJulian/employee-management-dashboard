<script>
import ManagementDataService from '../services/managementSystem'
import router from '../router/index'

export default {
  name: "login",
  data() {
    return {
      email: null,
      password: null,
      alert: false,
      required (v) {
        return !!v || 'Field is required'
      },
    }
  },
  methods: {
    async login(email, password) {
      const data = await ManagementDataService.employeeLogin(email, password);
      if (!data){
        this.alert = true;
      }
      const employeeInfo = data.employeeData;
      router.push({ path: `/dashboard/${employeeInfo.id}`});
      this.$store.commit({
        type: 'assign',
        data: employeeInfo
      });
    }
  }
}

</script>

<template>
<header class="rounded-lg bg-blue-darken-2 text-white">
    <h1 class="mb-2">Employee Management System</h1>
    <p class="mb-2">Please log in with your employee credentials to continue.</p>
    <v-form @submit.prevent>
      <v-responsive class="mx-auto mb-4" min-width="344">
        <v-text-field variant="solo" hide-details="auto" label="Email address" v-model="email" :rules="[required]" placeholder="johndoe@gmail.com" type="email"></v-text-field>
      </v-responsive>
      <v-responsive class="mx-auto" min-width="344">
        <v-text-field variant="solo" v-model="password" :rules="[required]" label="Password" type="password"></v-text-field>
      </v-responsive>
      <v-btn :type="'submit'" @click="login(email, password)" class="mt-2" >
        Login
      </v-btn>
    </v-form>
</header>
<div>
    <v-alert
      v-model="alert"
      variant="tonal"
      closable
      close-label="Close Alert"
      color="red-lighten-1"
      title="Uh oh!"
    >
    Email or password is incorrect.
    </v-alert>
  </div>
</template>

<style scoped>
 header {
padding: 28px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-bottom: 24px;
}
h1 {
margin-bottom: 4px;
font-weight: bolder;
font-size: 2rem;
}
form {
padding: 16px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
} 


</style> 
