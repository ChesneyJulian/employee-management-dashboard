import { createRouter, createWebHistory } from 'vue-router'
// pages in Views folder
import LoginView from '../views/LoginView.vue'
import Dashboard from '../views/Dashboard.vue'
import Projects from '../views/Projects.vue'
import ProjectDetails from '../views/ProjectDetails.vue'
import Timecard from '../views/Timecard.vue'
import Departments from '../views/Departments.vue'
import PersonalInfo from '../views/PersonalInfo.vue'
import Admin from '../views/Admin.vue'

import AuthServices from '../services/auth'

// create instance of vue router for frontend page routing
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
      path: '/info/:id',
      name: 'info',
      component: PersonalInfo,
      props: true,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
// check token authentication before routing anywhere besides login page
router.beforeEach((to, from, next) =>  {

  // check token exists and isn't expired
  const isAuthenticated = AuthServices.checkToken();
  // if isAuthenticated is true, decodeToken to check if user has admin access which returns true
  // if isAuthenticated is false, return false
  const adminAccess = isAuthenticated ? AuthServices.decodeToken().data.admin : false; 
  
  // if user is not authenticated and is trying to reach path that isn't home, reroute to home
  if (to.name !== 'home' && !isAuthenticated) {
    next({ name: 'home' }) 
  } 
  // if page back tracks to home, destroy token to prevent page forwarding without renewed credentials
  else if (isAuthenticated && to.name === 'home') {
    AuthServices.destroyToken();
    next({ name: 'home'});
  } 
  // if user is trying to reach admin page without adminAccess, reroute to home
  else if (to.name === 'admin' && !adminAccess) {
    next({ name: 'home'})
  } else {
    next();
  }
})

export default router
