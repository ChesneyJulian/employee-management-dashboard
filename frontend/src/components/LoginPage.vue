<script>
import ManagementDataService from '../services/managementSystem'
import router from '../router/index'

export default {
  name: "login",
  data() {
    return {
      email: null,
      password: null,
      required (v) {
        return !!v || 'Field is required'
      },
    }
  },
  methods: {
    async login(email, password) {
      console.log(email, password);
      const employeeData = await ManagementDataService.employeeLogin(email, password);
      console.log(employeeData);
      router.push({ name: 'dashboard' });
    }
  }
}

</script>

<template>
<header>
    <h1>Employee Management System</h1>
    <p>Please log in with your employee credentials to continue.</p>
    <v-form @submit.prevent>
      <v-responsive class="mx-auto mb-4" min-width="344">
        <v-text-field hide-details="auto" label="Email address" v-model="email" :rules="[required]" placeholder="johndoe@gmail.com" type="email"></v-text-field>
      </v-responsive>
      <v-responsive class="mx-auto" min-width="344">
        <v-text-field v-model="password" :rules="[required]" label="Password" type="input"></v-text-field>
      </v-responsive>
      <v-btn :type="submit" @click="login(email, password)" >
        Login
      </v-btn>
    </v-form>
</header>
</template>

<style scoped>
header {
/* max-width: 100vw; */
/* height: 300px; */
line-height: 3rem;
color: #FFFFFF;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}
h1 {
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
/* form input {
margin-bottom: 8px;
padding: 4px;
}  */
</style> 
