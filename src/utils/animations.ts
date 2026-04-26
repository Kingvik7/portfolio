export const pageTransition = {
  initial: { opacity: 0, scale: 0.98, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: "blur(6px)",
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
} as const;
