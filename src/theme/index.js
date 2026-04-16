export const PRIMARY = "#25aff4";

export function getTheme(dark) {
  return {
    bg: dark ? "#0d1b23" : "#f4f7f9",
    fg: dark ? "#e8eef2" : "#0d1b23",
    muted: dark ? "#5a7a8a" : "#8a9aaa",
    border: dark ? "rgba(37,175,244,0.12)" : "rgba(37,175,244,0.18)",
    navBg: dark ? "rgba(13,27,35,0.85)" : "rgba(244,247,249,0.85)",
    tickerBg: dark ? `${PRIMARY}06` : `${PRIMARY}08`,
    primary: PRIMARY,
  };
}
