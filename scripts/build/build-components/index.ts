import { resolve } from "node:path";
import type { resolveOption } from "..";
import { defineConfig, } from "vite";
import { writeFile } from 'fs/promises';

function resolveEsConfig(option: resolveOption) {
  const { rootDir, packageName, isWatchMode: watch, libName } = option

  return defineConfig({
    build: {
      outDir: resolve(rootDir, `packages/${packageName}/lib`),
      lib: {
        entry: resolve(rootDir, `packages/${packageName}/${libName}/index.ts`),
        formats: ['es'],
        fileName: `${libName}/index`,
      },
      rollupOptions: {
        treeshake: true,
        output: {
          exports: 'named',
        },
        external: ['lit', '@nova-design/shared'],
      },
      emptyOutDir: false,
      // watch,
    },
  })
}

export function resolveComponentsConfig(option: resolveOption) {
  return resolveEsConfig(option)
}


