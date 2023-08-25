import { resolve } from 'node:path'
import { fileURLToPath } from 'url'
import { build } from 'vite'
import fg from 'fast-glob'
import type { InlineConfig } from 'vite'
import dts from 'rollup-plugin-dts'

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

const pluginDts = dts({
  tsconfig: resolve(rootDir, 'tsconfig.build.json'),
})

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
          // 项目根目录，决定了打包后产物的存放为位置,也可以通过outDir确定
          // root: resolve(__dirname, '../packages/components'),
          build: {
            cssCodeSplit: true,
            outDir: resolve(rootDir, `packages/nova-design/lib`),
            lib: {
              entry: resolve(rootDir, `packages/${packageName}/${libName}/index.ts`),
              formats: ['es'],
              fileName: (format) => `${libName}/index.${format}.js`,
            },
            rollupOptions: {
              output: {
                exports: 'named',
              },
              external: ['lit']
            },
            emptyOutDir: false,
          },
        })
        // libConfig.push({
        //   // 项目根目录，决定了打包后产物的存放为位置,也可以通过outDir确定
        //   // root: resolve(__dirname, '../packages/components'),
        //   build: {
        //     outDir: resolve(rootDir, `packages/${packageName}/lib`),
        //     lib: {
        //       entry: resolve(rootDir, `packages/components/${libName}/index.ts`),
        //       formats: ['es'],
        //       fileName: `${libName}/index.d.ts`,
        //     },
        //     rollupOptions: {
        //       external: ['lit']
        //     }
        //   },
        //   plugins: [pluginDts]
        // })
      }
    }
  }
  return libConfig
}



async function buildEntry() {
  const configList = resolveConfig()
  await Promise.all(configList.map(viteConfig => build(viteConfig).catch(e => {
    console.error(e, '报错了', JSON.stringify(viteConfig));
    throw new Error('构建失败');
  })));

}




buildEntry()

