<template>
  <div class="flex flex-col items-start">
    <textarea
      v-model="state.expText"
      placeholder="Enter the expression"
    ></textarea>
    <button @click="state.loadExp()">LOAD</button>
    <pre v-if="state.exp">{{ state.exp.repr() }}</pre>
    <button @click="state.step()">STEP</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { StageState as State } from "./stage-state"

export default defineComponent({
  name: "stage-center",
  props: {
    state: { type: State, required: true },
  },
})
</script>
