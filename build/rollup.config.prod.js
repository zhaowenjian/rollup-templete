import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import {uglify} from 'rollup-plugin-uglify'
import {eslint} from 'rollup-plugin-eslint'

import {name} from './config'

export default {
  input: 'src/index.ts',
  output: {
    file: `dist/${name}.min.js`,
    name: name,
    format: 'umd'
  },
  external: [],
  plugins: [
    resolve({
      // whether to prefer built-in modules (e.g. `fs`, `path`) or
      // local ones with the same names
      preferBuiltins: false,  // Default: true
    }),
    commonjs({
      extensions: ['js', 'ts'],
      include: 'node_modules/**'
    }),
    eslint(),
    typescript({
      cacheRoot: 'node_modules/.rts2_cache'
    }),
    babel({
      // polyfill 配置：
      // presets: [
      //   [
      //     "@babel/preset-env",
      //     {
      //       modules: false, //设置ES6 模块转译的模块格式 默认是 commonjs
      //       spec: true,
      //       debug: true, // debug，编译的时候 console
      //       forceAllTransforms: true,
      //       useBuiltIns: 'usage', // 是否开启自动支持 polyfill
      //       corejs: 3
      //     }
      //   ]
      // ],
      presets: [
        [
          "@babel/preset-env",
          {
            "modules": false
          }
        ]
      ],
      // plugins: ["@babel/plugin-external-helpers"], // rollup-plugin-babel 已内置
      exclude: 'node_modules/**',
      extensions: ['js', 'ts'],
      runtimeHelpers: false
    }),
    uglify()
  ]
}