export const VIEWPORTS = ["pc", "laptop", "mobile"];

export const DEFAULT_VIEWPORT = "pc";

const DESIGN_WIDTH = {
  pc: 1440,
  laptop: 1024,
  mobile: 375,
};

export const designWidth = (viewport) =>
  DESIGN_WIDTH[viewport] ?? DESIGN_WIDTH[DEFAULT_VIEWPORT];

export const fitScale = (containerWidth, viewport) => {
  if (!containerWidth) return 1;
  return Math.min(1, containerWidth / designWidth(viewport));
};
