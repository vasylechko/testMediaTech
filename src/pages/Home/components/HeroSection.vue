<script setup>
import { gsap } from "gsap";
import { ref, onMounted, onUnmounted } from "vue";

import Play from "../../../components/icons/Play.vue";
import Button from "../../../components/ui/Button.vue";

const followStrength = 0.2;
const springConfig = {
  ease: "elastic.out(1, 0.4)",
  duration: 0.6,
};

const buttonElement = ref(null);

onMounted(() => {
  const element = buttonElement.value;

  element.addEventListener("mousemove", onMouseMove);
  element.addEventListener("mouseleave", onMouseLeave);
});

onUnmounted(() => {
  const element = buttonElement.value;

  element.removeEventListener("mousemove", onMouseMove);
  element.removeEventListener("mouseleave", onMouseLeave);
});

function onMouseMove(event) {
  const element = buttonElement.value;
  const { left, top, width, height } = element.getBoundingClientRect();

  const relX = event.clientX - (left + width / 2);
  const relY = event.clientY - (top + height / 2);

  const moveX = relX * followStrength;
  const moveY = relY * followStrength;

  gsap.to(element, {
    x: moveX,
    y: moveY,
    ...springConfig,
  });
}

function onMouseLeave() {
  gsap.to(buttonElement.value, {
    x: 0,
    y: 0,
    ...springConfig,
  });
}
</script>

<template>
  <section
    data-header-color="dark"
    class="relative flex justify-center pt-[128px] pb-[145px] bg-dark overflow-hidden bg-[url('/images/hero_section_decor.svg')] bg-no-repeat bg-bottom bg-cover"
  >
    <div class="w-full max-w-[90rem] relative z-20 lg:px-[74px] px-10">
      <div
        class="font-semibold md:text-start text-center lg:text-[140px] md:text-[80px] text-[65px]"
      >
        AI YouTube
      </div>

      <div class="flex md:justify-start justify-center items-center gap-x-7">
        <button
          class="customButton cursor-pointer group gap-x-3 w-[270px] before:rounded-[10px] before:content-[''] before:p-[2px] before:absolute h-[88px] rounded-[10px] bg-dark/50 relative border-none py-4 px-5 text-xl font-semibold text-ui-07 md:flex hidden items-center justify-center"
        >
          <span class="w-max"> WHAT IS THIS ?</span>

          <span
            class="size-[55px] rounded-full group-hover:brightness-50 duration-400 ease-in flex items-center justify-center [background-clip:padding-box,_border-box] bg-origin-border border-2 border-transparent [background-image:linear-gradient(#000,#000),linear-gradient(90deg,#8bff78,#ff86ff)]"
          >
            <Play />
          </span>
        </button>

        <div class="font-semibold lg:text-[140px] md:text-[80px] text-[65px]">Metadata</div>
      </div>

      <div class="flex gap-x-7 xl:items-center xl:flex-row flex-col md:items-start items-center">
        <div class="font-semibold lg:text-[140px] md:text-[80px] text-[65px]">Translation</div>

        <div
          class="xl:max-w-[236px] max-w-[350px] md:text-start text-center font-[18px] md:leading-[166%] leading-[22px] md:mb-0 mb-[47px]"
        >
          Take Your YouTube Content Global by Localizing Your YouTube Metadata.
        </div>
      </div>

      <div class="flex flex-col gap-5 items-center">
        <Button
          class="w-full md:hidden flex px-[42px] py-6 text-sm"
          :style="'blue'"
          label="TRY FOR FREE"
        />
        <Button class="w-full md:hidden flex px-[42px] py-6 text-sm" label="what is this ?">
          <template #before>
            <div class="mr-2.5">
              <Play />
            </div>
          </template>
        </Button>
      </div>

      <div
        ref="buttonElement"
        class="size-[145px] rounded-full md:flex hidden justify-center items-center text-xs tracking-[0.48px] bg-ui-03 absolute bottom-0 right-8 cursor-pointer"
      >
        TRY FOR FREE
      </div>
    </div>
  </section>
</template>

<style scoped>
.customButton {
  position: relative;
  transition: 0.3s ease;
  backdrop-filter: blur(4px);
}

.customButton::before {
  inset: 0;
  background: linear-gradient(90deg, #8bff78, #ff86ff, #fd86ff, #fff);
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  transition: 0.3s ease;
}

.customButton:hover::before {
  filter: brightness(0.4);
}
</style>
