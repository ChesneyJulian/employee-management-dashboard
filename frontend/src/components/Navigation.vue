<script>
import router from '@/router';
import AuthServices from '../services/auth'
  export default {
    name: 'navbar',
    data: () => ({
      drawer: false,
      group: null,
      items: [
        {
          title: 'Foo',
          value: 'foo',
        },
        {
          title: 'Bar',
          value: 'bar',
        },
        {
          title: 'Fizz',
          value: 'fizz',
        },
        {
          title: 'Buzz',
          value: 'buzz',
        },
      ],
    }),
    watch: {
      group () {
        this.drawer = false
      },
    },
    methods: {
      async logout() {
        AuthServices.destroyToken();
        router.push({ name: 'home' });
      },
      toDashboard() {
        router.push({ path: `dashboard/${this.$store.state.employeeId}` });
      }
    },
  }
</script>

<template>
  <v-card>
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>{{this.$store.state.name}} - Employee Dashboard</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-home" @click="toDashboard()"></v-btn>

        <v-btn variant="text" icon="mdi-logout" @click="logout()"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        location="top"
        temporary
      >
        <v-list
          :items="items"
        ></v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>


<style scoped>

</style>