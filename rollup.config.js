const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const typescript = require('@rollup/plugin-typescript')
const terser = require('@rollup/plugin-terser')
const { default: dts } = require('rollup-plugin-dts')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const css = require('rollup-plugin-import-css')
const packageJson = require('./package.json')

module.exports = [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      css({ minify: true })
    ],
    external: ['react', 'react-dom']
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/u]
  }
]
