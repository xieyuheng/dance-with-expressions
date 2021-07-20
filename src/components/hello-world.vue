<template>
  <h1 class="p-4">{{ msg }}</h1>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue"

export default defineComponent({
  name: "hello-world",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const count = ref(0)
    return { count }
  },
})
</script>
