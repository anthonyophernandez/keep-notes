import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Label from '../views/Label.vue'
import Trash from '../views/Trash.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/label/:id/:name',
    name: 'Label',
    component: Label
  },
  {
    path: '/trash',
    name: 'Trash',
    component: Trash
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
