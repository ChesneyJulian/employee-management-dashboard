import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import Dashboard from '../views/Dashboard.vue'
import Projects from '../views/Projects.vue'
import ProjectDetails from '../views/ProjectDetails.vue'
import Timecard from '../views/Timecard.vue'
import Departments from '../views/Departments.vue'
import PersonalInfo from '../views/PersonalInfo.vue'
import AuthServices from '../services/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView
    },
    {
      path: '/dashboard/:id',
      name: 'dashboard',
      component: Dashboard,
      props: true,
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    },
    {
      path: '/project-details/:projectId',
      name: 'projectDetails',
      component: ProjectDetails,
      props: true
    },
    {
      path: '/timecard',
      name: 'timecard',
      component: Timecard
    },
    {
      path: '/department',
      name: 'department',
      component: Departments
    },
    {
      path: '/info',
      name: 'info',
      component: PersonalInfo
    },
  ]
})
// check token authentication before routing anywhere besides login page
router.beforeEach((to, from, next) =>  {
  let isAuthenticated = AuthServices.checkToken();
  if (to.name !== 'home' && !isAuthenticated) next({ name: 'home' })
  else next();
// if page back tracks to home, destroy token to prevent page forwarding without renewed credentials
  if (isAuthenticated && to.name === 'home') {
    AuthServices.destroyToken();
    next({ name: 'home'});
  };
})

export default router
