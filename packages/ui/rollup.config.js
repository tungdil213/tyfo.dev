import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import typescript from '@rollup/plugin-typescript';
import preserveDirectives from 'rollup-plugin-preserve-directives';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  external: ['react', 'react-dom'],
  input: Object.fromEntries(
    globSync(['src/**/*.{ts,tsx}']).map((file) => [
      file.startsWith('src/') ?
        path.relative(
          'src',
          file.slice(0, file.length - path.extname(file).length)
        ) :
        path.basename(file, path.extname(file)),
      fileURLToPath(new URL(file, import.meta.url))
    ])
  ),
  output: [
    {
      format: 'es',
      dir: 'dist/',
      entryFileNames: '[name].js',
      preserveModules: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    preserveDirectives(),
  ],
  onwarn(warning, defaultHandler) {
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
    defaultHandler(warning);
  },
};

export default config;