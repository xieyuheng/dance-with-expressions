<template>
  <div class="m-3 font-bold">Welcome to the Stage!</div>
  <stage-loading v-if="!state" class="m-3" />
  <div v-else class="flex flex-col items-start">
    <stage-back :state="state" class="m-3" />
    <stage-center :state="state" class="m-3" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { StageState as State } from "./stage-state"

export default defineComponent({
  name: "stage",
  // prettier-ignore
  components: {
    "stage-loading": require("@/views/stage/stage-loading").default,
    "stage-back": require("@/views/stage/stage-back").default,
    "stage-center": require("@/views/stage/stage-center").default,
  },
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
    const state = await State.build({
      servant: this.servant,
      library_id: this.library_id,
    })
    await state.loadMod()
    this.state = state
  },
})
</script>
