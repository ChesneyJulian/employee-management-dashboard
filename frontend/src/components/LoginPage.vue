<script>
import ManagementDataService from '../services/managementSystem'
import AuthService from '../services/auth'
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
      await ManagementDataService.employeeLogin(email, password);
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
        <v-text-field variant="solo" hide-details="auto" label="Email address" v-model="email" :rules="[required]" placeholder="johndoe@gmail.com" type="email"></v-text-field>
      </v-responsive>
      <v-responsive class="mx-auto" min-width="344">
        <v-text-field variant="solo" v-model="password" :rules="[required]" label="Password" type="input"></v-text-field>
      </v-responsive>
      <v-btn :type="submit" @click="login(email, password)" >
        Login
      </v-btn>
    </v-form>
</header>
</template>

<style scoped>
header {
padding: 28px;
border-radius: 12px;;
background-color: rgba(39, 135, 245, 0.62);
color: #FFFFFF;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}
h1 {
line-height: 3rem;
margin-bottom: 4px;
font-weight: bolder;
font-size: 2rem;
}
p {
  margin-bottom: 4px;
}
form {
padding: 16px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}


</style> 
