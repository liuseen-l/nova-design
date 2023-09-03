import { resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import dts from 'vite-plugin-dts'
import { resolveOption } from "./build/index2"
import type { OutputOptions, RollupBuild } from 'rollup'

export function resolveDts(packageName: string, outDir: string) {
  const tsconfigPath = resolve(rootDir, `packages/${packageName}/tsconfig.json`)
  const _outDir = resolve(rootDir, outDir)
  return dts({
    tsconfigPath,
    outDir: _outDir
  })
}

export const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const rootDir = resolve(__dirname, '..')


export function resolveDtsConfig(option: resolveOption) {
  const { rootDir, packageName, } = option

  return defineConfig({
    build: {
      outDir: resolve(rootDir, `packages/${packageName}/lib`),
      lib: {
        entry: resolve(rootDir, `packages/${packageName}/index.ts`),
        formats: ['es'],
        fileName: `index`,
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
    plugins: [resolveDts(packageName, `packages/${packageName}/lib`)]
  })
}
export function formatBundleFilename(
  name: string,
  minify: boolean,
  ext: string
) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}
export const target = 'es2018'
