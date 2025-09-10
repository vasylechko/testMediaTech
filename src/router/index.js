import { createRouter, createWebHistory } from "vue-router";

import { loadLayoutMiddleware } from "./middleware/loadLayoutMiddleware.js";

import HomeRouters from "../pages/Home/routes.js";

const routes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...HomeRouters],
});

routes.beforeEach(loadLayoutMiddleware);

export default routes;
