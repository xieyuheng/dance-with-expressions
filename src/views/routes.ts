import { RouteRecordRaw } from "vue-router"

const toplevel: Array<RouteRecordRaw> = [
  { path: "/", component: () => import("@/views/home") },
  { path: "/stage", component: () => import("@/views/stage") },
]

const catchall: Array<RouteRecordRaw> = []

export const routes: Array<RouteRecordRaw> = [
  // NOTE the order matters
  ...toplevel,
  // TODO
  ...catchall,
]
