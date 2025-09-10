<script setup lang="ts">
import { gsap } from "gsap";
import { ref, onMounted } from "vue";

import QuestionNo from "../../../components/icons/QuestionNo.vue";
import QuestionYes from "../../../components/icons/QuestionYes.vue";
import QuestionPartially from "../../../components/icons/QuestionPartially.vue";

defineProps({
  question: {
    type: {
      type: Object,
      default: () => ({}),
    }
  }
})

let tl: gsap.core.Timeline;
const tooltip = ref<HTMLElement | null>(null);
const bgLayer = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!tooltip.value || !bgLayer.value) return;

  const extraContent = tooltip.value.querySelector(".extra") as HTMLElement;
  if (!extraContent) return;

  const fullHeight = extraContent.scrollHeight;

  gsap.set(bgLayer.value, { backgroundColor: "transparent", opacity: 0 });
  gsap.set(extraContent, { height: 0, opacity: 0 });

  tl = gsap.timeline({ paused: true });

  tl.to(bgLayer.value, {
    backgroundColor: "#000",
    opacity: 1,
    duration: 0.25,
    ease: "power2.out"
  });

  tl.to(extraContent, {
    height: fullHeight,
    opacity: 1,
    duration: 0.4,
    ease: "power2.out"
  }, "-=0.1");

  tl.eventCallback("onReverseComplete", () => {
    gsap.set(extraContent, { height: 0, opacity: 0 });
    gsap.set(bgLayer.value, { backgroundColor: "transparent", opacity: 0 });
  });
});

const getIconComponent = (iconName) => {
  switch (iconName) {
    case "yes":
      return QuestionYes;
    case "no":
      return QuestionNo;
    case "partially":
      return QuestionPartially;
    default:
      return null;
  }
};

const hoverIn = () => tl?.play();
const hoverOut = () => tl?.reverse();
</script>

<template>
  <div
    class="relative inline-block w-min"
    @mouseenter="hoverIn"
    @mouseleave="hoverOut"
  >
    <div class="relative inline-flex items-center justify-center rounded-xl z-10">
      <component :is="getIconComponent(question.icon)" />
    </div>

    <div class="absolute left-1/2 top-[140px] -translate-x-1/2 w-full text-center z-20">
      <span class="block text-[24px] font-medium text-white">
        {{ question.title }}
      </span>
    </div>

    <div
      ref="tooltip"
      class="relative left-1/2 -top-[166px] -translate-x-1/2 w-full origin-top rounded-b-xl overflow-hidden z-10"
    >
      <div ref="bgLayer" class="absolute inset-0 rounded-b-xl"></div>

      <div class="extra relative z-10 overflow-hidden">
        <div class="px-[34px] pt-[50px] pb-[34px]">
          <p class="text-center text-[20px] text-ui-05 mb-10 leading-[26px]">
            {{ question.text }}
          </p>

          <button
            class="block w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
          >
            START FOR FREE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
