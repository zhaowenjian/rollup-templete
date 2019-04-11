import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import {eslint} from 'rollup-plugin-eslint'

import {name} from './config'

export default {
  input: 'src/index.ts',
  output: {
    file: `dist/${name}.js`,
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
    eslint(),
    commonjs({
      extensions: ['js', 'ts'],
      include: 'node_modules/**'
    }),
    typescript({
      cacheRoot: 'node_modules/.rts2_cache'
    })
  ]
}