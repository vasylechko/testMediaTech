<script setup>
import QuestionItem from "./QuestionItem.vue";

defineProps({
  questions: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div
    class="flex lg:flex-row flex-col justify-between lg:items-start items-center lg:gap-y-0 gap-y-10"
  >
    <template v-for="(question, index) in questions" :key="index">
      <QuestionItem :question="question" />
    </template>
  </div>
</template>
