const FALLBACK = ["#0D3B3A", "#7FA39B", "#C7D6CE", "#F1F4EF"];

export const paletteToVars = (colors) => {
  const c = Array.isArray(colors) && colors.length ? colors : FALLBACK;
  return {
    "--c-primary": c[0] ?? FALLBACK[0],
    "--c-secondary": c[1] ?? c[0] ?? FALLBACK[1],
    "--c-accent": c[2] ?? c[1] ?? c[0] ?? FALLBACK[2],
    "--c-surface": c[3] ?? c[2] ?? c[1] ?? c[0] ?? FALLBACK[3],
  };
};
