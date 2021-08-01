<template>
  <div class="p-3 font-bold">Welcome to the Stage!</div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue"
import { StageState as State } from "./stage-state"

export default defineComponent({
  name: "stage",

  setup(props) {
    const state = reactive<State>(new State())

    return { state }
  },
})
</script>
