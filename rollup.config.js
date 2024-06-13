const babel = require('@rollup/plugin-babel')
const resolve = require('@rollup/plugin-node-resolve')
const external = require('rollup-plugin-peer-deps-external')
const terser = require('@rollup/plugin-terser')
const postcss = require('rollup-plugin-postcss')
const typescript = require('@rollup/plugin-typescript')
const typescriptPaths = require('rollup-plugin-typescript-paths')
const dts = require("rollup-plugin-dts")

module.exports = [
  {
    input: './index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
      }
    ],
    plugins: [
      postcss({
        plugins: [],
        minimize: true,
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react', "@babel/preset-typescript"]
      }),
      external(),
      resolve(),
      terser(),
      typescript({ tsconfig: './tsconfig.json' }),
      typescriptPaths.typescriptPaths(),
    ]
  },
  {
    input: 'types.d.ts',
    output: [{ file: 'dist/types.d.ts', format: "esm" }],
    external: [/\.css$/],
    plugins: [
      dts.dts(),
      typescriptPaths.typescriptPaths(),
    ],
  },
]