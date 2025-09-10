<script setup>
import QuestionItems from "./QuestionItems.vue";

import Bullhorn from "../../../components/icons/Bullhorn.vue";
import ArrowDown from "../../../components/icons/ArrowDown.vue";

const questions = [
  {
    icon: "partially",
    title: "Partially",
    text: "Awesome! Localizing your YouTube metadata is a perfect choice for you. Let's translate your video titles, descriptions, and tags, so people from all around the globe can discover your content.",
  },
  {
    icon: "yes",
    title: "Yes",
    text: "Awesome! Localizing your YouTube metadata is a perfect choice for you. Let's translate your video titles, descriptions, and tags, so people from all around the globe can discover your content.",
  },
  {
    icon: "no",
    title: "No",
    text: "Awesome! Localizing your YouTube metadata is a perfect choice for you. Let's translate your video titles, descriptions, and tags, so people from all around the globe can discover your content.",
  },
];
</script>

<template>
  <section
    data-header-color="light"
    class="w-full bg-white bg-[url('/images/question_section_decor.png')] bg-repeat-x bg-top md:pt-[210px] pt-[180px] md:pb-[180px] pb-20 md:bg-auto bg-size-[auto_80px]"
  >
    <div class="flex justify-center">
      <div class="w-full max-w-[90rem] lg:px-0 px-7">
        <div class="flex justify-center md:mb-[28px] mb-[42px]">
          <Bullhorn class="text-dark md:size-[200px] size-[82px]" />
        </div>

        <div class="flex justify-center md:mb-0 mb-4">
          <div
            class="text-dark font-semibold lg:text-[74px] md:text-[50px] text-[38px] max-w-[900px] text-center md:leading-[80px] leading-[40px] mb-8"
          >
            Are your videos understandable without voice narration?
          </div>
        </div>

        <div
          class="text-center md:font-semibold font-normal text-dark md:text-[38px] text-base md:leading-[40px] leading-4 md:mb-8 mb-4"
        >
          Choose answear
        </div>

        <div class="flex justify-center md:mb-[76px] mb-10">
          <ArrowDown class="text-ui-03" />
        </div>

        <QuestionItems :questions="questions" />
      </div>
    </div>
  </section>
</template>
