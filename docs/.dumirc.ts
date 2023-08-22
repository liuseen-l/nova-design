import { defineConfig } from "dumi";
import type { SiteThemeConfig } from "dumi-theme-antd-style";
import path from "node:path";

import { name } from "../package.json";

import { featuresZh } from "./config/features";

const isProd = process.env.NODE_ENV === "production";

const themeConfig: SiteThemeConfig = {
  name: "nova-design",
  logo: "https://gw.alipayobjects.com/zos/hitu-asset/c88e3678-6900-4289-8538-31367c2d30f2/hitu-1609235995955-image.png",

  hero: {
    "zh-CN": {
      description: "一款基于 Web Components 的组件库",
      actions: [
        {
          type: "primary",
          text: "开始使用",
          link: "/guide",
        },
        {
          text: "Github",
          link: "https://github.com/liuseen-l/nova-design",
          openExternal: true,
        },
      ],
      features: featuresZh,
    },
    "en-US": {
      description: "A library of web components components",
      actions: [
        {
          type: "primary",
          text: "Start",
          link: "/guide-en",
        },
        {
          text: "Github",
          link: "https://github.com/liuseen-l/nova-design",
          openExternal: true,
        },
      ],
    },
  },
  // socialLinks: { github: homepage },
  apiHeader: {
    pkg: name,
    sourceUrl: `{github}/tree/master/src/components/{atomId}/index.tsx`,
    docUrl: `{github}/tree/master/example/docs/components/{atomId}.{locale}.md`,
  },
  footer: "Made with ❤️ by every FE Struggler",
};

export default defineConfig({
  themeConfig,
  html2sketch: {},
  resolve: {
    docDirs: ['blog']
  },
  favicons: [
    "https://gw.alipayobjects.com/zos/hitu-asset/c88e3678-6900-4289-8538-31367c2d30f2/hitu-1609235995955-image.png",
  ],
  locales: [
    { id: "zh-CN", name: "中文", suffix: "" },
    { id: "en-US", name: "English", suffix: "-en" },
  ],
  alias: {
    "dumi-theme-antd-style": path.join(__dirname, "../src"),
  },
  styles: [
    `html, body { background: transparent;  }

  @media (prefers-color-scheme: dark) {
    html, body { background: #0E1116; }
  }`,
  ],
  codeSplitting: {
    jsStrategy: "granularChunks",
  },
  // @ts-ignore
  ssr: isProd ? {} : false,
});
