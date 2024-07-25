const esbuild = require('esbuild');
const glob = require('glob');
const htmlPlugin = require('@chialab/esbuild-plugin-html');

const entryPoints = glob.sync('public/src/*.tsx');

esbuild.build({
  entryPoints: entryPoints,
  bundle: true,
  outdir: 'public/dist',
  minify: true,
  sourcemap: true,
  platform: 'browser',
  target: 'es2015',
  plugins: [htmlPlugin()],
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
  },
}).catch(() => process.exit(1));
