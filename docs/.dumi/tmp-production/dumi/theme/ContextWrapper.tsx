// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React, { useState, useEffect, useRef } from 'react';
import { useOutlet, history } from 'dumi';
import { SiteContext } from 'F:/forProjects/nova-design/node_modules/.pnpm/dumi@2.2.6_@babel+core@7.22.10_@types+node@20.4.7_eslint@8.47.0_postcss@8.4.28_prettier@3.0.2_ovv5fsrzvzeyksvp3sse4qxiei/node_modules/dumi/dist/client/theme-api/context.js';
import { demos, components } from '../meta';
import { locales } from '../locales/config';

const entryExports = {
  
  
};

export default function DumiContextWrapper() {
  const outlet = useOutlet();
  const [loading, setLoading] = useState(false);
  const prev = useRef(history.location.pathname);

  useEffect(() => {
    return history.listen((next) => {
      if (next.location.pathname !== prev.current) {
        prev.current = next.location.pathname;

        // scroll to top when route changed
        document.documentElement.scrollTo(0, 0);
      }
    });
  }, []);

  return (
    <SiteContext.Provider value={{
      pkg: {"name":"@nova-design/docs"},
      historyType: "browser",
      entryExports,
      demos,
      components,
      locales,
      loading,
      setLoading,
      hostname: undefined,
      themeConfig: {"footer":"Made with ❤️ by every FE Struggler","prefersColor":{"default":"light","switch":true},"nprogress":true,"lastUpdated":true,"name":"nova-design","logo":"https://gw.alipayobjects.com/zos/hitu-asset/c88e3678-6900-4289-8538-31367c2d30f2/hitu-1609235995955-image.png","hero":{"zh-CN":{"description":"一款基于 Web Components 的组件库","actions":[{"type":"primary","text":"开始使用","link":"/guide"},{"text":"Github","link":"https://github.com/liuseen-l/nova-design","openExternal":true}],"features":[{"title":"跨框架","link":"/guide","image":"💠","description":"适用于不同框架","row":7},{"title":"支持原子化css","description":"天然支持 TailwindCss 、 Unocss 等原子化css方案","link":"/guide/style","imageType":"light","image":"https://gw.alipayobjects.com/zos/hitu-asset/c88e3678-6900-4289-8538-31367c2d30f2/hitu-1609235995955-image.png","row":8}]},"en-US":{"description":"A library of web components components","actions":[{"type":"primary","text":"Start","link":"/guide-en"},{"text":"Github","link":"https://github.com/liuseen-l/nova-design","openExternal":true}]}},"apiHeader":{"pkg":"nova-design","sourceUrl":"{github}/tree/master/src/components/{atomId}/index.tsx","docUrl":"{github}/tree/master/example/docs/components/{atomId}.{locale}.md"}},
      _2_level_nav_available: true,
    }}>
      {outlet}
    </SiteContext.Provider>
  );
}