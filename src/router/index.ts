import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: require("@/views/routes").routes,
})

export default router
