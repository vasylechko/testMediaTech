<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from "vue";
import { useSwipe } from "@vueuse/core";

const props = defineProps({
  slides: {
    type: Array,
    default: () => [],
  },
});

const cardWidthPx = 300;
const defaultGapPx = 16;

const container = ref(null);
const cardRefs = ref([]);

const activeIndex = ref(0);
const measuredGap = ref(defaultGapPx);
let measuredCardWidth = cardWidthPx;

const rawProgress = ref(0);
const progress = computed(() =>
  Math.min(100, (rawProgress.value / (props.slides.length - 1)) * 100),
);

function updateMeasurements() {
  if (!container.value || !cardRefs.value[0]) return;

  const firstRect = cardRefs.value[0].getBoundingClientRect();

  measuredCardWidth = Math.round(firstRect.width) || cardWidthPx;

  if (cardRefs.value[1]) {
    const secondRect = cardRefs.value[1].getBoundingClientRect();

    measuredGap.value =
      Math.round(secondRect.left - (firstRect.left + firstRect.width)) || defaultGapPx;
  }

  const contRect = container.value.getBoundingClientRect();
  const centerPad = Math.max(0, (contRect.width - measuredCardWidth) / 2);

  container.value.style.paddingLeft = `${centerPad}px`;
  container.value.style.paddingRight = `${centerPad}px`;
}

let raf = null;
let scrollTimeout = null;
let lastScrollLeft = 0;
let lastTimestamp = 0;

function onScroll(e) {
  if (!container.value) return;

  const now = performance.now();
  const delta = container.value.scrollLeft - lastScrollLeft;
  const dt = now - lastTimestamp;
  const velocity = dt > 0 ? Math.abs(delta / dt) : 0;

  lastScrollLeft = container.value.scrollLeft;
  lastTimestamp = now;

  if (raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const step = measuredCardWidth + measuredGap.value;
    const exactIndex = container.value.scrollLeft / step;

    rawProgress.value = exactIndex;
    activeIndex.value = Math.round(exactIndex);
  });

  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const step = measuredCardWidth + measuredGap.value;
    const exactIndex = container.value.scrollLeft / step;

    const targetIndex =
      velocity > 0.3
        ? delta > 0
          ? Math.ceil(exactIndex)
          : Math.floor(exactIndex)
        : Math.round(exactIndex);

    scrollToIndex(targetIndex);
  }, 150);
}

function scrollToIndex(index) {
  if (!container.value) return;
  const step = measuredCardWidth + measuredGap.value;
  const left = index * step;

  container.value.scrollTo({ left, behavior: "smooth" });
}

useSwipe(container, {
  onSwipeEnd(_, direction) {
    if (direction === "left" && activeIndex.value < props.slides.length - 1) {
      scrollToIndex(activeIndex.value + 1);
    } else if (direction === "right" && activeIndex.value > 0) {
      scrollToIndex(activeIndex.value - 1);
    } else {
      scrollToIndex(activeIndex.value);
    }
  },
});

let resizeObserver;

onMounted(async () => {
  await nextTick();
  updateMeasurements();

  if (window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      updateMeasurements();
      scrollToIndex(activeIndex.value);
    });
    resizeObserver.observe(container.value);
    cardRefs.value.forEach((c) => c && resizeObserver.observe(c));
  } else {
    window.addEventListener("resize", updateMeasurements);
  }
});

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
  if (scrollTimeout) clearTimeout(scrollTimeout);
  if (resizeObserver) resizeObserver.disconnect();
  else window.removeEventListener("resize", updateMeasurements);
});
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <div
      ref="container"
      class="relative w-full flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
      style="touch-action: pan-x; -webkit-overflow-scrolling: touch"
      @scroll.passive="onScroll"
    >
      <div
        v-for="(slide, i) in slides"
        :key="i"
        :ref="(el) => (cardRefs[i] = el)"
        class="shrink-0"
        :style="{ width: cardWidthPx + 'px', scrollSnapAlign: 'center' }"
      >
        <div
          class="border rounded-2xl border-dark px-[30px] py-[60px] w-full bg-white text-dark h-full"
        >
          <div class="w-10 h-10 border rounded-full flex items-center justify-center mb-[42px]">
            {{ i + 1 }}
          </div>
          <h3 class="font-bold text-lg mb-4">{{ slide.title }}</h3>
          <p class="text-sm text-gray-600 leading-relaxed">{{ slide.text }}</p>
        </div>
      </div>
    </div>

    <div class="w-1/2 h-2 bg-gray-200 rounded-full mt-6 overflow-hidden">
      <div
        class="h-full bg-blue-500 transition-[width] duration-150 ease-out"
        :style="{ width: progress + '%' }"
      />
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
