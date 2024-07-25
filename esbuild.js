const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/server.ts', 'src/worker.ts', 'src/contentTypes.ts'],
  bundle: true,
  outdir: 'dist',
  minify: true,
  sourcemap: true,
  platform: "node",
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
  },
}).catch(() => process.exit(1));
