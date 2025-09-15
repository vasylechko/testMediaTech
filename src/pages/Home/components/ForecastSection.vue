<script setup>
import Button from "../../../components/ui/Button.vue";
</script>

<template>
  <section
    data-forecast-section
    data-header-color="dark"
    class="relative cursor-none w-full min-h-auto bg-white"
  >
    <div
      class="relative w-full lg:aspect-[16/9] aspect-none bg-[url('/images/forecast_icon.svg')] bg-no-repeat lg:bg-[length:100%_100%] bg-center bg-cover md:pt-[135px] pt-[60px] md:pb-[300px] pb-[200px]"
    >
      <img
        src="/images/forecast_decor_01.svg"
        alt="decor"
        class="absolute left-[20%] bottom-[8%] z-0 md:w-auto w-[50px]"
      />

      <img
        src="/images/forecast_decor_02.svg"
        alt="decor"
        class="absolute md:left-[10%] left-[5%] top-[22%] z-0 md:w-auto w-[50px]"
      />

      <img
        src="/images/forecast_decor_03.svg"
        alt="decor"
        class="absolute right-[20%] bottom-[15%] z-0 md:w-auto w-[50px]"
      />

      <div class="flex flex-col items-center justify-center text-center z-10 px-4">
        <div
          class="text-[clamp(54px,calc(54px+56*(100vw-768px)/768),110px)] leading-[1.07] font-semibold xl:max-w-[924px] lg:max-w-[700px] md:max-w-[450px] max-w-[280px] text-white md:mb-9 mb-4"
        >
          Still Not Sure What Results Can You Expect?
        </div>

        <div
          class="text-[clamp(14px,calc(54px+56*(100vw-768px)/768),22px)] leading-[1.07] text-white/80 xl:max-w-[600px] md:max-w-[400px] max-w-[280px] w-full md:mb-0 mb-[36px]"
        >
          Find out how many views AI Metadata Translation can bring to your channel, and how much
          time it saves!
        </div>

        <Button class="w-full max-w-[280px] md:hidden flex" label="Read more" :style="'blue'" />
      </div>
    </div>
  </section>
</template>
