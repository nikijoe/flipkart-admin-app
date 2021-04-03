const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:2000"
    : "https://magic-bumpy-raver.glitch.me";
export const api = `${baseUrl}/api`;
export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
