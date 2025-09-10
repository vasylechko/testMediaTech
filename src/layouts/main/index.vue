<script setup>
import Header from "../components/MainHeader.vue";
defineOptions({ name: "MainLayouts" });
</script>

<template>
  <div class="min-h-screen w-full bg-white">
    <div class="mx-auto flex min-h-screen flex-col">
      <Header />

      <main class="flex-auto pb-16">
        <slot />
      </main>
    </div>
  </div>
</template>
