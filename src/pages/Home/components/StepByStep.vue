<script setup lang="ts">
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

import Plus from "../../../components/icons/Plus.vue";

gsap.registerPlugin(ScrollTrigger);

defineProps({
  steps: {
    type: Array,
    default: () => [],
  },
});

const activeStep = ref(0);
const scrollerRef = ref<HTMLElement | null>(null);
const stepEls = ref<HTMLElement[]>([]);
const imageEls = ref<HTMLElement[]>([]);
const progressRef = ref<HTMLElement | null>(null);

let triggers: ScrollTrigger[] = [];

onMounted(async () => {
  await nextTick();

  await rebuild();
  window.addEventListener("resize", rebuild);
});

onBeforeUnmount(() => {
  killAllTriggers();
  window.removeEventListener("resize", rebuild);
});

function killAllTriggers() {
  triggers.forEach((t) => {
    try {
      t.kill();
    } catch (e) {}
  });

  triggers = [];

  ScrollTrigger.getAll().forEach((t) => {
    try {
      t.kill();
    } catch (e) {}
  });
};

function waitForImagesLoaded(root: HTMLElement | null, timeout = 3000) {
  new Promise<void>((resolve) => {
    if (!root) return resolve();
    const imgs = Array.from(root.querySelectorAll("img"));
    if (imgs.length === 0) return resolve();

    let loaded = 0;
    const onDone = () => {
      loaded++;
      if (loaded >= imgs.length) resolve();
    };

    imgs.forEach((img) => {
      if ((img as HTMLImageElement).complete) {
        onDone();
      } else {
        img.addEventListener(
          "load",
          function cb() {
            img.removeEventListener("load", cb);
            onDone();
          },
          { once: true }
        );
        img.addEventListener(
          "error",
          function eb() {
            img.removeEventListener("error", eb);
            onDone();
          },
          { once: true }
        );
      }
    });

    setTimeout(() => resolve(), timeout);
  });
}


async function rebuild() {
  killAllTriggers();

  await nextTick();

  stepEls.value = Array.from(document.querySelectorAll<HTMLElement>(".step"));
  imageEls.value = Array.from(document.querySelectorAll<HTMLElement>(".step-image"));

  await waitForImagesLoaded(document.body);

  if (!scrollerRef.value) {
    console.warn("scrollerRef is null, skipping ScrollTrigger setup");
    return;
  }

  const scroller = scrollerRef.value as HTMLElement;

  if (progressRef.value) {
    gsap.set(progressRef.value, { scaleY: 0, transformOrigin: "top center" });
  }

  if (progressRef.value) {
    const tlProgress = gsap.timeline({ paused: true });
    tlProgress.to(progressRef.value, { scaleY: 1, ease: "none", duration: 1 });

    const scrollableHeight = Math.max(0, scroller.scrollHeight - scroller.clientHeight);

    ScrollTrigger.create({
      scroller,
      trigger: scroller,
      start: "top top",
      end: () => `+=${scrollableHeight || scroller.scrollHeight}`,
      scrub: 0.5,
      animation: tlProgress,
    });
  }

  stepEls.value.forEach((el, i) => {
    const t = ScrollTrigger.create({
      scroller,
      trigger: el,
      start: "top center",
      end: "bottom center",
      onEnter: () => (activeStep.value = i),
      onEnterBack: () => (activeStep.value = i),
    });
    triggers.push(t);
  });

  imageEls.value.forEach((el, i) => {
    const prev = i > 0 ? imageEls.value[i - 1] : null;

    const commonST = {
      scroller,
      trigger: stepEls.value[i],
      start: "top center",
      end: "bottom center",
      scrub: true,
    };

    if (prev) {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            ...commonST,
          },
        }
      );

      gsap.to(prev, {
        y: -50,
        opacity: 0,
        scrollTrigger: {
          ...commonST,
        },
      });
    } else {
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            ...commonST,
          },
        }
      );
    }
  });
};
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

          <div class="h-[23vh]" />
        </div>
      </div>

      <div class="absolute top-0 left-0 w-[4px] h-full bg-gray-200 rounded">
        <div ref="progressRef" class="w-full h-full bg-blue-500 rounded" />
      </div>
    </div>

    <div
      class="lg:w-[457px] w-[360px] lg:h-[593px] h-[457px] bg-dark rounded-[50%/40%] flex items-center justify-center overflow-hidden relative"
    >
      <div class="absolute inset-0">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="absolute inset-0 flex flex-col items-center justify-center text-white px-8 text-center step-image"
        >
          <div v-if="index === 0" class="relative">
            <Plus />

            <img
              class="absolute lg:-right-8 -right-4 lg:-top-16 -top-6 rounded-full border-2 border-white lg:size-[162px] size-[100px]"
              src="/images/person.png"
              alt="person"
            />
          </div>

          <div v-else-if="index === 1" class="relative">
            <img src="/images/step_2.png" alt="step 2" />
          </div>

          <div v-else class="relative">
            <img src="/images/step_3.png" alt="step 3" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>