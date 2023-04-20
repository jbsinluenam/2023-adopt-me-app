import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // or @vitejs/plugin-react-refresh in 
export default defineConfig({
  plugins: [react()],
  root: "src",
});