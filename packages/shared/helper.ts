export function genCssStyle(rules: string) {
  const styleSheet: CSSStyleSheet = new CSSStyleSheet()
  styleSheet.replaceSync(rules)
  let cssText = ''
  const styleList = Array.from(styleSheet.cssRules)
  for (const styleItem of styleList)
    cssText += styleItem.cssText

  return cssText
}
