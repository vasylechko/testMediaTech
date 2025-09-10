<script setup>
import gsap from "gsap";
import { ref, onUnmounted, watchEffect } from "vue";

import { isTablet, isMobile } from "../helpers/checkWindowSize.js";

let isInside = false;
let listenerAttached = false;

const text = ref(null);
const cursor = ref(null);

watchEffect(() => {
  if (isTablet() || isMobile()) {
    detachListener();

    if (cursor.value) {
      gsap.set(cursor.value, { opacity: 0 });
    }
  } else {
    if (cursor.value) {
      gsap.set(cursor.value, { opacity: 1 });
    }

    attachListener();
  }
});

onUnmounted(() => detachListener());

function moveHandler(event) {
  if (!cursor.value) return;

  gsap.to(cursor.value, {
    x: event.clientX,
    y: event.clientY,
    duration: 0.4,
    ease: "power3.out",
  });

  const targetSection = document.querySelector("[data-forecast-section]");

  if (!targetSection) return;

  const rect = targetSection.getBoundingClientRect();
  const inside =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;

  if (inside && !isInside) {
    gsap.to(cursor.value, { width: 175, height: 175, duration: 0.4, ease: "power3.out" });
    gsap.to(text.value, { opacity: 1, duration: 0.4 });
    isInside = true;
  } else if (!inside && isInside) {
    gsap.to(cursor.value, { width: 24, height: 24, duration: 0.4 });
    gsap.to(text.value, { opacity: 0, duration: 0.2 });
    isInside = false;
  }
}

function attachListener() {
  if (!listenerAttached) {
    window.addEventListener("mousemove", moveHandler);
    listenerAttached = true;
  }
}

function detachListener() {
  if (listenerAttached) {
    window.removeEventListener("mousemove", moveHandler);
    listenerAttached = false;
  }
}
</script>

<template>
  <div
    ref="cursor"
    class="fixed top-0 left-0 w-[24px] h-[24px] rounded-full bg-ui-03 pointer-events-none flex items-center justify-center z-[100]"
    style="transform: translate(-50%, -50%)"
  >
    <span ref="text" class="text-white text-lg font-bold pointer-events-none select-none opacity-0">
      Get Forecast
    </span>
  </div>
</template>
