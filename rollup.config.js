import css from "rollup-plugin-import-css";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
    input: "src/app.js",
    output: { 
        file: "dist/app.js",
        format: "iife",
        name: "app",
    },
    plugins: [
        nodeResolve(),
        css({
            output: "bundle.css"
        })
    ]
};