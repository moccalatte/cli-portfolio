import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [mdx(), tailwind(), react()],
  markdown: {
    syntaxHighlight: false,
  },
  contentEntryFilePattern: "**/*.never-match",
});
