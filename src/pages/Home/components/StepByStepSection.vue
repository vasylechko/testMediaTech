<script setup>
import MobileSlider from "./MobileSlider.vue";
import StepByStep from "./StepByStep.vue";

const steps = [
  {
    title: "Connect Your Channel",
    text: "Link your channel to AIR Media-Tech with just a few clicks. It's an ultimate space for creators with over 30 tailored services, including AI Metadata translation.",
  },
  {
    title: "Get Translations",
    text: "AI Metadata Translation analyzes your channel, generates translations in minutes, and adds them to your channel automatically.",
  },
  {
    title: "Monitor Growth",
    text: "Watch your channel's global views grow! After adding metadata in new languages, you’ll see your content reaching new countries along with boosting your income.",
  },
];
</script>

<template>
  <section data-header-color="light" class="flex justify-center">
    <div
      class="w-full max-w-[90rem] md:py-[120px] pt-20 pb-[120px] xl:px-[92px] md:px-[42px] px-5 md:h-[842px] h-auto"
    >
      <StepByStep :steps="steps" />

      <MobileSlider class="md:hidden flex" :slides="steps" />
    </div>
  </section>
</template>
