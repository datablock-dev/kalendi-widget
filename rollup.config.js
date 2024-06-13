const babel = require('@rollup/plugin-babel')
const resolve = require('@rollup/plugin-node-resolve')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const terser = require('@rollup/plugin-terser')
const postcss = require('rollup-plugin-postcss')
const typescript = require('@rollup/plugin-typescript')
const commonjs = require('@rollup/plugin-commonjs')
const preserveDirectives = require('rollup-plugin-preserve-directives')

const plugins = [
  postcss(),
  peerDepsExternal(),
  resolve(),
  terser.default({
    compress: {
      directives: false
    }
  }),
  typescript({
    tsconfig: './tsconfig.json'
  }),
  commonjs(),
  preserveDirectives.preserveDirectives()
  //babel({
  //  exclude: 'node_modules/**',
  //  presets: ['@babel/preset-react', "@babel/preset-typescript"]
  //}),
]

module.exports = [
  {
    input: "src/index.ts",
    plugins: plugins,
    external: ['react', 'react-dom', /\.css$/],
    output: [
      {
        dir: "dist",
        format: "es",
        exports: "named",
        preserveModules: true, // Keep directory structure and files
      },
    ]
  }
]