const baseUrl =
  //   window.location.hostname === "localhost"
  //     ? "http://localhost:2000"
  //     : "https://magic-bumpy-raver.glitch.me";
  window.location.hostname === "localhost"
    ? "http://localhost:2000"
    : "https://flipkart-backend-server.herokuapp.com";
export const api = `${baseUrl}/api`;
export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};
