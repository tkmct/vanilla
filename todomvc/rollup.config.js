// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'js/index.js',
  output: {
    file: 'app.js',
    format: 'cjs'
  },
  plugins: [ 
    resolve(),
    commonjs()
  ]
};
