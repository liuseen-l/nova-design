import { resolve } from "node:path";
import { resolveDts } from '../../utils'
import type { resolveOption } from "..";
import type { InlineConfig, } from "vite";

function resolveEsConfig(option: resolveOption) {
  const { rootDir, packageName, isWatchMode: watch } = option
  let libName = option.libName ? option.libName : 'index'


  return {
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
    },
    plugins: [resolveDts(packageName, `packages/${packageName}/lib`)]
  } as InlineConfig
}

export function resolveComponentsConfig(option: resolveOption) {
  return resolveEsConfig(option)
}
