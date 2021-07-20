<template>
  <h1 class="p-4">Dance with Expressions</h1>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from "vue"
import { HomeState as State } from "./home-state"

export default defineComponent({
  name: "home",
  setup(props) {


    const state = reactive<State>(new State())
  },
})
</script>
