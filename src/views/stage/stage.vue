<template>
  <div class="p-3 font-bold">Welcome to the Stage!</div>
  <div v-if="!state">Loading...</div>
  <div v-else class="flex flex-col items-start">
    <pre class="p-3 border-2 border-gray-400">{{ state.text }}</pre>
    <h2>// OUTPUT:</h2>
    <pre
      class="p-3 border-2 border-blue-400"
      v-if="state.report && state.report.output"
      >{{ state.report.output }}</pre
    >
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
  name: "stage",
  props: {
    servant: { type: String, required: true },
    library_id: { type: String, required: true },
  },
  data(): { state: State | null } {
    return {
      state: null,
    }
  },
  async mounted(): Promise<void> {
    this.state = await State.build({
      servant: this.servant,
      library_id: this.library_id,
    })
    await this.state.loadMod()
  },
})
</script>
