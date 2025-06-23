import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // 👈 necesario para Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // 👈 plugin de Flowbite
    require("@tailwindcss/forms"), // 👈 opcional: para estilos de formularios
    require("@tailwindcss/line-clamp"), // 👈 si usás line-clamp
  ],
};

export default config;
