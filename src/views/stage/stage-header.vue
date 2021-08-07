<template>
  <div class="font-bold">//// Stage!</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { StageState as State } from "./stage-state"

export default defineComponent({
  name: "stage-header",
  props: {
    state: { type: State | null },
  },
})
</script>
