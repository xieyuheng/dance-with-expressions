<template>
  <div class="flex flex-col items-start">
    <pre class="p-3 border-2 border-gray-400">{{ state.text }}</pre>
    <h2>// OUTPUT:</h2>
    <pre
      class="p-3 border-2 border-blue-400"
      v-if="state.report && state.report.output"
      >{{ state.report.output }}</pre
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { StageState as State } from "./stage-state"

export default defineComponent({
  name: "stage-back",
  props: {
    state: { type: State, required: true },
  },
})
</script>
