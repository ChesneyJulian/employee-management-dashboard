<script>
export default {
  name: "login",
  data() {
    return {

    }
  },
  methods: {
    async login(event, email, password) {
      event.preventDefault();
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
    <form>
      <input v-model="email" placeholder="email">
      <input v-model="password" placeholder="password">
      <button :type="submit" @click="(event) => login(event, email, password)">Submit</button>
    </form>
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
form input {
margin-bottom: 8px;
padding: 4px;
}
</style>
