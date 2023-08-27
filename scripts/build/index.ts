import { resolve } from 'node:path'
import { build } from 'vite'
import fg from 'fast-glob'
import type { InlineConfig } from 'vite'
import { execa } from 'execa'
import { resolveComponentsConfig } from './build-components'
import { rootDir } from '../utils'
import { resolveSharedConfig } from './build-shared'
import minimist from 'minimist'
import fps from 'node:fs/promises'

const args = minimist(process.argv.slice(2))
const isWatchMode = args.watch || false

const packages: string[] = []

packages.push(
  ...fg
    .sync('*', {
      cwd: resolve(`${rootDir}/packages`),
      onlyDirectories: true,
      ignore: ['theme-chalk', 'nova-design']
    })
)

export interface resolveOption {
  packageName: string,
  rootDir: string
  isWatchMode: boolean
  libName?: string,
}

async function helperMakeDist(packageName: string) {
  const fileContent = await fps.readFile(resolve(rootDir, `packages/${packageName}/index.ts`), 'utf-8')
  const entries = fileContent.split('\n').filter(Boolean).map(c => {
    const toAry = c.split("")
    toAry.splice(toAry.length - 1, 0, '/index.mjs')
    return toAry.join("")
  })
  await fps.writeFile(resolve(rootDir, `packages/${packageName}/lib/index.mjs`), entries.join('\n'))
}

function resolveConfig() {
  const libConfig: InlineConfig[] = []

  for (const packageName of packages) {
    if (packageName === 'components') {
      const libs = fg.sync('*/index.ts', {
        cwd: resolve(`${rootDir}/packages/${packageName}`),
        ignore: ['**/node_modules', '**/lib']
      }).map(i => i.split('/')[0])

      for (const libName of libs) {
        libConfig.push(resolveComponentsConfig({
          rootDir,
          packageName,
          libName,
          isWatchMode
        }))
      }

      helperMakeDist(packageName)

    } else {
      libConfig.push(resolveSharedConfig({
        rootDir,
        packageName,
        isWatchMode
      }))
    }
  }
  return libConfig
}



async function buildEntry() {
  await execa('pnpm run clean:dist', { stdio: 'inherit' })

  const configList = resolveConfig()

  await Promise.all(configList.map(viteConfig => build(viteConfig).catch(e => {
    throw new Error('构建失败');
  })));

}


buildEntry()

