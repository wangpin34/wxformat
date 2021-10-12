function isExternal(href: string) {
  return !href.startsWith('https://mp.weixin.qq.com')
}

export { isExternal }
