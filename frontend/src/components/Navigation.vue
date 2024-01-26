<script>
import router from '@/router';
import AuthServices from '../services/auth'
  export default {
    name: 'navbar',
    data: () => ({
      drawer: false,
      group: null,
    }),
    watch: {
      group () {
        this.drawer = false
      },
    },
    methods: {
      async logout() {
        AuthServices.destroyToken();
        router.replace({ name: 'home'});
      },
      toDashboard() {
        router.replace({ path: `/dashboard/${this.$store.state.employeeId}`});
      }
    },
  }
</script>

<template>
  <section>
  <v-card elevation="10">
    <v-layout>
      <v-toolbar
        class="py-2 bg-blue-darken-2"
        prominent
      >
        <v-toolbar-title>{{this.$store.state.name}} - Employee Dashboard</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn variant="text" icon="mdi-home" @click="toDashboard()"></v-btn>
        <v-btn variant="text" icon="mdi-logout" @click="logout()"></v-btn>
      </v-toolbar>
    </v-layout>
  </v-card>
</section>
</template>


<style scoped>
section {
  margin-bottom: 24px;
}
</style>