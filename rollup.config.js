const babel = require('@rollup/plugin-babel')
const resolve = require('@rollup/plugin-node-resolve')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const terser = require('@rollup/plugin-terser')
const postcss = require('rollup-plugin-postcss')
const typescript = require('@rollup/plugin-typescript')
const dts = require("rollup-plugin-dts")
const commonjs = require('@rollup/plugin-commonjs')
const packageJson = require("./package.json");

module.exports = [
  {
    input: './src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        exports: 'named'
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
        exports: 'named'
      },
    ],
    plugins: [
      postcss({
        plugins: [],
        minimize: true,
      }),
      //babel({
      //  exclude: 'node_modules/**',
      //  presets: ['@babel/preset-react', "@babel/preset-typescript"]
      //}),
      peerDepsExternal(),
      resolve(),
      terser(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
    external: ['react', 'react-dom']
  },
  {
    input: './src/index.ts',
    output: [{ file: 'dist/types.d.ts', format: "es" }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
]

/*


*/