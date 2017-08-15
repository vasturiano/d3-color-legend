import nodeResolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';

export default {
    entry: 'src/index.js',
    dest: 'dist/d3-color-legend.js',
    format: 'umd',
    moduleName: 'ColorLegend',
    plugins: [
        commonJs(),
        nodeResolve({
            jsnext: true,
            main: true
        })
    ]
};