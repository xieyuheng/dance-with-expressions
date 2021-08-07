<template>
  <div class="flex flex-col">
    <router-link
      class="flex items-center p-1"
      v-for="example in examples"
      :to="{
        path: '/stage',
        query: {
          servant: example.servant,
          library_id: example.library_id,
        },
      }"
    >
      <icon-link class="p-1" />
      <div>{{ example.title }}</div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

type Example = {
  title: string
  servant: string
  library_id: string
}

export default defineComponent({
  name: "home-examples",
  // prettier-ignore
  components: {
    "icon-link": require("@/components/icons/icon-link.vue").default
  },
  data(): { examples: Array<Example> } {
    return {
      examples: [
        {
          title: "The Calculi of Lambda Conversion",
          servant: "github",
          library_id: "xieyuheng/the-calculi-of-lambda-conversion",
        },
        {
          title: "The Calculi of Lambda Conversion again",
          servant: "github",
          library_id: "xieyuheng/the-calculi-of-lambda-conversion",
        },
      ],
    }
  },
})
</script>
