import babel from 'rollup-plugin-babel';

export default {
    input: 'src/index.js',
    output: [
        {
            format: 'es',
            file: 'dist/d3-color-legend.mjs'
        }
    ],
    plugins: [
        babel({
            presets: [
                ["es2015", { "modules": false }]
            ],
            plugins: ["external-helpers"],
            babelrc: false
        })
    ]
};