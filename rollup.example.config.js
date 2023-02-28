const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const terser = require('@rollup/plugin-terser');
const replace = require('@rollup/plugin-replace');
const css = require('rollup-plugin-import-css');
const serve = require('rollup-plugin-serve');

module.exports = [
  {
    input: 'examples/index.tsx',
    output: [
      {
        file: 'dist/examples/bundle.js',
        format: 'iife',
      },
    ],
    plugins: [
      resolve(),
      replace({
        'process.env.NODE_ENV': JSON.stringify( 'development' ),
        preventAssignment: true,
      }),
      commonjs(),
      typescript({
        sourceMap: false,
      }),
      terser(),
      css({ minify: true }),
      serve({
        open: true,
        verbose: true,
        contentBase: ['dist','examples'],
        host: 'localhost',
        port: 3000,
      }),
    ],
  }
];
