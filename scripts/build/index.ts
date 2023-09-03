import { resolve } from 'node:path'
import { build, defineConfig } from 'vite'
import fg from 'fast-glob'
import type { InlineConfig } from 'vite'
import { execa } from 'execa'
import { rootDir } from '../utils'
import minimist from 'minimist'
import dts from 'vite-plugin-dts'
import fs from 'node:fs'
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

const external = ['lit', 'lit/decorators.js']

function resolveConfig() {
  const libConfig: InlineConfig[] = []
  const entries = []

  for (const packageName of packages) {
    entries.push(resolve(rootDir, `packages/${packageName}/index.ts`))
  }

  libConfig.push(defineConfig({
    plugins: [
      dts({
        tsconfigPath: resolve(rootDir, './tsconfig.build.json'),
        outDir: [resolve(rootDir, `dist/nova-design/es`)],
      }),
    ],
    build: {
      minify: false,
      sourcemap: true,
      lib: {
        entry: entries,
      },
      rollupOptions: {
        // TODO: auto check dependent
        external,
        treeshake: true,
        output: [
          {
            format: 'esm',
            dir: resolve(rootDir, `dist/nova-design/es`),
            exports: undefined,
            preserveModules: true,
            // preserveModulesRoot: resolve(rootDir, `dist/nova-design/es/packages`),
            entryFileNames: `[name].mjs`,
          },
        ],
      },
    },
  }))
  return libConfig
}

async function buildEntry() {
  // await execa('pnpm run clean', { stdio: 'inherit' })

  const configList = resolveConfig()

  Promise.all(configList.map(viteConfig => build(viteConfig).catch(e => {
    throw new Error('构建失败');
  }))).then(r => {
    // helperMakeDist('components')
    fs.copyFileSync(resolve(rootDir, 'packages/nova-design/package.json'), resolve(rootDir, 'dist/nova-design/package.json'))
  });

}

buildEntry()

