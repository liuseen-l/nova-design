import { resolve } from 'node:path'
import { build, defineConfig } from 'vite'
import fg from 'fast-glob'
import { execa } from 'execa'
import { esDir, rootDir } from '../consts'
import minimist from 'minimist'
import dts from 'vite-plugin-dts'
import fs from 'fs-extra'
import chalk from 'chalk'
import dayjs from 'dayjs'
import path from 'node:path'

const args = minimist(process.argv.slice(2))
const isWatchMode = args.watch ? {} : null
const packages: string[] = []

packages.push(
  ...fg
    .sync('*', {
      cwd: resolve(`${rootDir}/packages`),
      onlyDirectories: true,
      ignore: ['theme-chalk', 'nova-design']
    })
)

function resolveConfig() {
  const entries = []

  // TODO: auto scan the target dependent
  const external = ['lit', 'lit/decorators.js']

  for (const packageName of packages) {
    entries.push(resolve(rootDir, `packages/${packageName}/index.ts`))
  }

  /**
   * TODO: 
   *  1. umd cjs
   *  2. lose entry bundle 
   */
  return defineConfig({
    plugins: [
      dts({
        tsconfigPath: resolve(rootDir, './tsconfig.build.json'),
        outDir: [esDir],
      }),
    ],
    build: {
      watch: isWatchMode,
      minify: false,
      sourcemap: true,
      lib: {
        entry: entries,
      },
      rollupOptions: {
        external,
        treeshake: true,
        output: [
          {
            format: 'esm',
            dir: esDir,
            exports: undefined,
            preserveModules: true,
            preserveModulesRoot: resolve(esDir, `packages`),
            entryFileNames: `[name].mjs`,
          },
        ],
      },
    },
  })
}

function resolvePackageJson(source: string, dest: string) {
  const packageJSON = fs.readJSONSync(source)
  packageJSON.name = '@nova-design/core'
  // TODO: add the dependency on the scan 
  fs.writeJSONSync(dest, packageJSON, {
    spaces: 2,
  })
}

function genPackageJson() {
  const sourcePkgPath = resolve(rootDir, 'packages/nova-design/package.json')
  const destPkgPath = resolve(rootDir, 'dist/nova-design/package.json')
  if (!isWatchMode) {
    // In non-watch mode, the callback function 
    // will only be executed when the build is complete, so the directory exists at this time
    resolvePackageJson(sourcePkgPath, destPkgPath)
  } else {
    // In watch mode, this function executes before the build completes, 
    // so the directory may not exist
    const dir = path.dirname(destPkgPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    resolvePackageJson(sourcePkgPath, destPkgPath)
  }
}

async function buildEntry() {
  const startCleanTime = dayjs().valueOf()
  console.log(chalk.green('[nova-design] start clean dist...'))
  await execa('pnpm run clean', { stdio: 'inherit' })
  const endCleanTime = dayjs().valueOf()
  console.log(chalk.green(`[nova-design] dist clean in ${endCleanTime - startCleanTime}ms`))

  const viteConfig = resolveConfig()

  build(viteConfig).then(r => {
    genPackageJson()
    console.log(chalk.green('[nova-design] build success!!!'))
  }).catch(e => {
    console.log(chalk.red('[nova-design] build error'))
    console.log(chalk.red(`[nova-design] error message:${e}`))
  })
}

buildEntry()

