import { resolve } from "node:path"
import { fileURLToPath } from "node:url"

export const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const rootDir = resolve(__dirname, '..')


