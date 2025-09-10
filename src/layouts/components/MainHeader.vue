<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import Button from "../../components/ui/Button.vue";

const links = [
  { title: "about", routeName: "home" },
  { title: "How it Works", routeName: "wallet" },
  { title: "Cases", routeName: "news" },
  { title: "Pricing", routeName: "faq" },
  { title: "FAQ", routeName: "faq" },
];

const headerColor = ref("dark");

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll() {
  const header = document.querySelector("header");
  const headerTop = header?.getBoundingClientRect()?.top;

  const sections = document.querySelectorAll("[data-header-color]");

  for (const section of sections) {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;

    if (headerTop >= sectionTop && headerTop < sectionBottom) {
      headerColor.value = section.dataset.headerColor;
      break;
    }
  }
}
</script>

<template>
  <header
    class="z-50 border-b md:py-[18px] py-[20px] flex justify-center sticky top-0 transition-colors duration-300 border-ui-01 px-4"
    :class="headerColor === 'dark' ? 'bg-dark text-white ' : 'bg-white text-black'"
  >
    <div class="w-full max-w-[90rem] flex items-center justify-between">
      <div class="flex items-center gap-x-4 flex-shrink-0">
        <img
          :src="`/images/${headerColor === 'dark' ? `logo.png` : `logo-dark.png`}`"
          alt="logo"
          class="h-10 min-h-[40px]"
        />

        <div class="lg:block hidden w-px h-[42px] bg-ui-02" />

        <img
          class="lg:block hidden"
          :src="`/images/${headerColor === 'dark' ? `powered_by.png` : `powered_by_dark.png`}`"
          alt="powered by"
        />
      </div>

      <div
        class="md:flex-none flex-1 overflow-x-auto lg:overflow-x-visible scrollbar-hide ml-5 min-w-0"
      >
        <div class="flex items-center lg:gap-x-5 gap-x-3 flex-nowrap">
          <nav class="flex flex-nowrap">
            <ul class="flex text-xs sm:text-sm gap-x-4 lg:gap-x-[26px] font-[Arial]">
              <li
                v-for="(link, index) in links"
                :key="index"
                class="md:flex block md:border-none border rounded-full border-white md:p-0 py-2 px-3 md:h-auto h-fit md:w-auto w-max flex-shrink-0 min-w-[40px]"
                :class="{ '!border-dark': headerColor !== 'dark' }"
              >
                <a class="uppercase truncate"> {{ link?.title }} </a>
              </li>
            </ul>
          </nav>

          <div class="flex items-center gap-x-3 sm:gap-x-5 flex-shrink-0 min-w-[80px]">
            <div class="uppercase font-bold text-xs sm:text-sm truncate">Login</div>

            <Button :theme="headerColor" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
