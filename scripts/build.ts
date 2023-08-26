import { resolve } from 'node:path'
import { fileURLToPath } from 'url'
import { build } from 'vite'
import fg from 'fast-glob'
import type { InlineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { execa } from 'execa'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootDir = resolve(__dirname, '..')

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
  const libConfig: InlineConfig[] = []
  for (const packageName of packages) {
    if (packageName === 'components') {
      const libs = fg.sync('*/index.ts', {
        cwd: resolve(`${rootDir}/packages/${packageName}`),
        ignore: ['**/node_modules', '**/lib']
      }).map(i => i.split('/')[0])

      for (const libName of libs) {
        libConfig.push({
          build: {
            outDir: resolve(rootDir, `packages/nova-design/lib`),
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
              external: ['lit'],
            },
            emptyOutDir: false,
          },
          plugins: [dts({
            tsconfigPath: resolve(rootDir, 'tsconfig.build.json'),
            outDir: resolve(rootDir, `packages/nova-design/lib`),
          })],
        })
      }
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

