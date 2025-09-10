<template>
  <component :is="route.meta.layoutComponent">
    <router-view />
  </component>

  <CursorFollower />
</template>

<script setup>
import { useRoute } from "vue-router";
import CursorFollower from "./components/CursorFollower.vue";

const route = useRoute();
</script>
