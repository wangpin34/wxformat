const copyToClipboard = (editableDiv: HTMLDivElement) => {
  /*
   * fallback to older browsers (including Safari)
   * if clipboard API not supported
   */
  const range = document.createRange()
  range.selectNode(editableDiv)
  const select = window.getSelection()
  select?.removeAllRanges()
  select?.addRange(range)
  document.execCommand(`copy`)
  return Promise.resolve(true)
}

export default copyToClipboard
