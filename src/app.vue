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
