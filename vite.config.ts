import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        monkey({
            entry: "src/main.ts",
            userscript: {
                namespace:
                    "https://github.com/e6nlaq/atcoder-shorter-affiliation",
                match: ["https://atcoder.jp/contests/*/standings*"],
                name: "Atcoder Shorter Affiliation",
                grant: ["GM_getValue", "GM_setValue", "GM_registerMenuCommand"],
                author: "e6nlaq",
                copyright: "(C) 2026 e6nlaq",
            },
        }),
    ],
});
