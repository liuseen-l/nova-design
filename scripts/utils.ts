import { resolve } from "node:path"
import { fileURLToPath } from "node:url"
import dts from 'vite-plugin-dts'

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
