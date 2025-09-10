export async function loadLayoutMiddleware(route) {
  try {
    let layout = route.meta.layout;
    let layoutComponent = await import(`../../layouts/${layout}/index.vue`);

    route.meta.layoutComponent = layoutComponent.default;
  } catch (e) {
    let layout = "main";
    let layoutComponent = await import(`../../layouts/${layout}/index.vue`);

    route.meta.layoutComponent = layoutComponent.default;
  }
}
