import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Label from '../views/Label.vue'
import Trash from '../views/Trash.vue'
import Archive from '../views/Archive.vue'

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
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
