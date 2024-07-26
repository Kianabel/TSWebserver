const fs = require("fs");
const esbuild = require("esbuild");

async function monitorFile() {
  while (true) {
    try {
      let file1 = fs.readFileSync("./contentTypes.ts").toString();
      let file2 = fs.readFileSync("./server.ts").toString();
      let file3 = fs.readFileSync("./worker.ts").toString();

      await delay(200);

      let file1Update = fs.readFileSync("./contentTypes.ts").toString();
      let file2Update = fs.readFileSync("./server.ts").toString();
      let file3Update = fs.readFileSync("./worker.ts").toString();

      if (
        file1 !== file1Update ||
        file2 !== file2Update ||
        file3 !== file3Update
      ) {
        await buildFiles();
      }
    } catch (error) {
      console.error("Error reading files:", error);
    }
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function buildFiles() {
  try {
    await esbuild.build({
      entryPoints: ['./server.ts', './worker.ts', './contentTypes.ts'],
      bundle: true,
      outdir: '../dist',
      minify: true,
      sourcemap: true,
      platform: "node",
      loader: {
        '.ts': 'ts',
        '.tsx': 'tsx',
      },
    }).catch(() => process.exit(1));
    console.log("Change detected, opinion accepted");
  } catch (error) {
    console.error("Build failed:", error);
  }
}

monitorFile();
