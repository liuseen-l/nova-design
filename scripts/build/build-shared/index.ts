import { resolve } from "node:path";
import { resolveDts } from "../../utils";
import type { resolveOption } from "..";
import type { InlineConfig } from "vite";

export function resolveSharedConfig(option: resolveOption) {
  const { rootDir, packageName, isWatchMode: watch } = option
  return {
    build: {
      lib: {
        entry: resolve(rootDir, `packages/${packageName}/index.ts`),
        formats: ['es']
      },
      rollupOptions: {
        treeshake: true,
        output: {
          dir: resolve(rootDir, `packages/${packageName}/dist`),
          entryFileNames: '[name].mjs',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: resolve(rootDir, `packages/${packageName}`),
        },
      },
      emptyOutDir: false,
    },
    plugins: [resolveDts(packageName, `packages/${packageName}/dist`)]
  } as InlineConfig
}
