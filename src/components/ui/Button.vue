<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "Sign Up",
  },

  style: {
    type: String,
    default: "button",
  },

  theme: {
    type: String,
    default: "dark",
  },
});

const selectedClasses = computed(() => {
  return {
    "border-2 !border-dark !text-dark after:!bg-ui-03 hover:!text-white hover:!border-ui-03":
      props.theme === "light",
    "!bg-ui-03 !border-none": props.style === "blue",
  };
});
</script>

<template>
  <button
    class="flex justify-center leading-[100%] border-2 hover:text-dark border-white text-white bg-transparent py-4 px-8 animated-button cursor-pointer relative overflow-hidden rounded-md outline-none transition-colors ease-out duration-400 z-[1]"
    :class="selectedClasses"
  >
    <slot name="before" />

    <span class="uppercase font-bold tracking-[0,64px]">
      {{ label }}
    </span>

    <slot name="after" />
  </button>
</template>

<style scoped>
.animated-button::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: -5px;
  width: 0;
  height: 0;
  background-color: white;
  transition:
    width 0.5s ease-out,
    height 0.5s ease-out,
    bottom 0.5s ease-out,
    left 0.5s ease-out,
    border-bottom-left-radius 1s ease-out,
    border-top-right-radius 1s ease-out;
  z-index: -1;
  border-top-right-radius: 100px;
  border-bottom-left-radius: 6px;
}

.animated-button:hover::after {
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
