import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { getAuth } from "firebase/auth"

// import HomeView from '../views/HomeView.vue'
import Items from '../views/Items.vue'
import Item from '../views/Item.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Account from '../views/Account.vue'
import About from '../views/About.vue'




Vue.use(VueRouter)


const waitForAuthReady = async () => new Promise ((resolve) => {

  if (!store.state.authReady) {
    getAuth().onAuthStateChanged( () => {
      store.commit('setAuthReady')
      resolve()
    })
  }
  else {
    resolve()
  }
  
})
  


const requireAuth = async (to, from, next) => {

  await waitForAuthReady()
  
  const { currentUser } = getAuth()

  if (!currentUser && to.name !== 'login') {
    // redirect the user to the login page
    next({ name: 'login' })
  }
  else {
    next()
  }
}

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/items',
    alias: '/',
    name: 'items',
    component: Items,
    beforeEnter: requireAuth,
  },
  {
    path: '/items/:id',
    name: 'item',
    component: Item,
    beforeEnter: requireAuth,
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    beforeEnter: requireAuth,
    auth: true,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
