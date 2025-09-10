export default [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/main/Page.vue"),
    meta: {
      layout: "main",
    },
  },
];
