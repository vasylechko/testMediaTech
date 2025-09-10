<script setup>
import Button from "../../../components/ui/Button.vue";
</script>

<template>
  <section
    data-forecast-section
    data-header-color="dark"
    class="relative cursor-none w-full lg:min-h-screen min-h-auto md:pt-[135px] pt-[60px] md:pb-[300px] pb-[200px] bg-[url('/images/forecast_bg.svg')] bg-no-repeat bg-top lg:bg-[length:100%_auto] bg-cover bg-white"
  >
    <div class="flex justify-center">
      <div class="w-full max-w-[90rem] flex flex-col items-center">
        <div
          class="md:text-[110px] text-[54px] font-semibold leading-[57px] md:leading-[117px] md:max-w-[924px] max-w-[280px] text-white text-center md:mb-9 mb-4"
        >
          Still Not Sure What Results Can You Expect?
        </div>

        <div
          class="md:text-[22px] text-sm text-white/80 md:max-w-[584px] max-w-[280px] w-full text-center md:mb-0 mb-[36px]"
        >
          Find out how many views AI Metadata Translation can bring to your channel, and how much
          time it saves!
        </div>

        <Button class="w-full max-w-[280px] md:hidden flex" label="Read more" :style="'blue'" />
      </div>
    </div>
  </section>
</template>
