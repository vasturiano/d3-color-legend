import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/index.js',
    dest: 'dist/d3-color-legend.js',
    format: 'umd',
    moduleName: 'ColorLegend',
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        })
    ]
};