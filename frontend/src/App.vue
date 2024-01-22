<script>
import { RouterLink, RouterView } from 'vue-router'
import ManagementDataService from './services/managementSystem'

export default {
  name: "app",
  data() {
    return {

    }
  },
  methods: {
    async getDepartments () {
      const departmentData = await ManagementDataService.getAllDepartments();
      const dataLength = departmentData.data.length;
      for (let i = 0; i < dataLength; i++) {
        console.log(departmentData.data[i]);
      }
    },
    async login(event, email, password) {
      event.preventDefault();
      console.log(email, password);
      const employeeData = await ManagementDataService.employeeLogin(email, password);
      console.log(employeeData);
    }
  }
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <button @click="getDepartments()">Get Departments</button>
      </nav>
      <form>
        <input v-model="email" placeholder="email">
        <input v-model="password" placeholder="password">
        <button :type="submit" @click="(event) => login(event, email, password)">Submit</button>
      </form>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
