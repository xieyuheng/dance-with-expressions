<template>
  <home />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue"

export default defineComponent({
  name: "app",
  // prettier-ignore
  components: {
    "home": defineAsyncComponent(() => import("./views/home.vue")),
  },
})
</script>
