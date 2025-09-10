import { useBreakpoints } from "@vueuse/core";

const breakpointsTailwind = {
  sm: 768,
  md: 992,
  lg: 1280,
  xl: 1420,
  xxl: 1860,
};

const breakpoints = useBreakpoints(breakpointsTailwind);
const isDesk = breakpoints.greaterOrEqual("lg");
const isTab = breakpoints.between("sm", "lg");
const isMob = breakpoints.smaller("sm");

export const isDesktop = () => isDesk.value;

export const isTablet = () => isTab.value;

export const isMobile = () => isMob.value;
