import path from 'node:path'
import { fileURLToPath } from 'node:url'

const resolveEntryForPkg = (p: string) =>
  path.resolve(fileURLToPath(import.meta.url), `../../packages/${p}/index.ts`)

const entries = {
  '@nova-design/vue': resolveEntryForPkg('vue'),
  '@nova-design/react': resolveEntryForPkg('react'),
}

export { entries }
