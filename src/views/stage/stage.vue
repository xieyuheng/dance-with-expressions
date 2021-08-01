<template>
  <div class="p-3 font-bold">Welcome to the Stage!</div>
  <div v-if="!state">Loading...</div>
  <div v-else>
    <pre class="p-3">{{ state.text }}</pre>
    <h2>// OUTPUT:</h2>
    <pre v-if="state.report.output" class="p-3">{{ state.report.output }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, onMounted } from "vue"
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
    this.state.run()
  },
})
</script>
