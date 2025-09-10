<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Plus from "../../../components/icons/Plus.vue";

gsap.registerPlugin(ScrollTrigger);

defineProps({
  steps: {
    type: Array,
    default: () => [],
  },
});

const activeStep = ref(0);
const scrollerRef = ref(null);
const stepEls = ref([]);
const progressRef = ref(null);

let triggers = [];

const killAllTriggers = () => {
  triggers.forEach((t) => t.kill());
  triggers = [];
};

const rebuild = async () => {
  killAllTriggers();
  await nextTick();

  stepEls.value = Array.from(document.querySelectorAll(".step"));

  // Прогрес-бар
  if (progressRef.value) {
    gsap.set(progressRef.value, { scaleY: 0, transformOrigin: "top" });
  }

  // Timeline для прогрес-бару
  const tl = gsap.timeline({ paused: true });

  tl.to(progressRef.value, { scaleY: 1, ease: "none", duration: 1 });

  ScrollTrigger.create({
    scroller: scrollerRef.value,
    trigger: scrollerRef.value,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5,
    animation: tl,
  });

  // Створюємо ScrollTrigger для кожного степу
  stepEls.value.forEach((el, i) => {
    const t = ScrollTrigger.create({
      scroller: scrollerRef.value,
      trigger: el,
      start: "top center",
      end: "bottom center",
      onEnter: () => (activeStep.value = i),
      onEnterBack: () => (activeStep.value = i),
    });

    triggers.push(t);
  });
};

onMounted(async () => {
  await rebuild();
  window.addEventListener("resize", rebuild);
});

onBeforeUnmount(() => {
  killAllTriggers();
  window.removeEventListener("resize", rebuild);
});
</script>

<template>
  <div class="md:flex hidden justify-between gap-[64px]">
    <div class="relative flex-1 h-[593px] flex">
      <div ref="scrollerRef" class="h-full overflow-y-auto pr-6 no-scrollbar">
        <div class="pl-[65px]">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="step mb-[84px]"
            :class="index === steps.length - 1 ? '!mb-0' : ''"
          >
            <div
              class="size-[52px] rounded-full border flex justify-center items-center mb-[34px]"
              :class="
                index <= activeStep ? 'border-ui-06 text-dark' : 'border-gray-300 text-gray-400'
              "
            >
              {{ index + 1 }}
            </div>
            <div
              class="font-semibold lg:leading-[58px] leading-[38px] lg:text-[56px] text-[32px] tracking-[-0.392px] mb-[34px]"
              :class="index <= activeStep ? 'text-ui-06' : 'text-gray-400'"
            >
              {{ step.title }}
            </div>
            <div
              class="lg:text-lg text-sm lg:leading-[30px] leading-[18px] max-w-[432px]"
              :class="index <= activeStep ? 'text-dark' : 'text-gray-400'"
            >
              {{ step.text }}
            </div>
          </div>
        </div>
      </div>

      <div class="absolute top-0 left-0 w-[4px] h-full bg-gray-200 rounded">
        <div ref="progressRef" class="w-full h-full bg-blue-500 rounded" />
      </div>
    </div>

    <div
      class="lg:w-[457px] w-[360px] lg:h-[593px] h-[457px] bg-dark rounded-[50%/40%] flex items-center justify-center overflow-hidden relative"
    >
      <transition name="fade" mode="out-in">
        <div
          v-if="activeStep !== null"
          :key="activeStep"
          class="w-full h-full flex flex-col items-center justify-center text-white px-8 text-center"
        >
          <div v-if="activeStep === 0" class="relative">
            <Plus />

            <img
              class="absolute lg:-right-8 -right-4 lg:-top-16 -top-6 rounded-full border-2 border-white lg:size-[162px] size-[100px]"
              src="/images/person.png"
              alt="person"
            />
          </div>

          <div v-if="activeStep === 1" class="relative">
            <img src="/images/step_2.png" alt="person" />
          </div>

          <div v-if="activeStep === 2" class="relative">
            <img src="/images/step_3.png" alt="person" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
