<template>
  <hello-world msg="hello expressions" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue"

export default defineComponent({
  name: "app",
  // prettier-ignore
  components: {
    "hello-world": defineAsyncComponent(() => import("./components/hello-world.vue")),
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
