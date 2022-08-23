import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import HeatMap3d from '../views/ModelViewer/HeatMap3d.vue'
import ModelViewerDemo from '../views/ModelViewer/ModelViewerDemo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/model-viewer/heat-map-3d',
    name: 'model-viewer.heat-map-3d',
    component: HeatMap3d,
  },
  {
    path: '/model-viewer/demo',
    name: 'model-viewer.demo',
    component: ModelViewerDemo,
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
