// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

function assembleIo() {
    let cfg = [];

    const plugins = [
        typescript(), 
        terser()
    ]

    cfg.push({
        input: `src/index.ts`,
        output: [
            {
                file: `dist/fast-deep-equal.js`,
                format: 'iife',
                name: "fret",
                strict: false,
            },
            {
                file: `dist/fast-deep-equal.cjs`,
                format: 'cjs',
                name: "fret",
                strict: false,
            },
            {
                file: `dist/fast-deep-equal.mjs`,
                format: 'es',
                name: "fret",
                strict: false,
            },
        ],
        plugins
    })

    return cfg;
}

export default assembleIo();
