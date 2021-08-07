<template>
  <div>
    <h1 class="p-3 font-bold">Dance with Expressions</h1>
    <home-examples class="m-2" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "home",
  // prettier-ignore
  components: {
    "home-examples": require("@/views/home/home-examples.vue").default,
  },
})
</script>
