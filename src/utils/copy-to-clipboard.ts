async function copyToClipboard(editableElement: HTMLElement): Promise<boolean> {
  if (navigator.clipboard) {
    const html = editableElement.innerHTML
    const blobInput = new Blob([html], { type: 'text/html' })
    //@ts-ignore
    const clipboardItemInput = new ClipboardItem({ 'text/html': blobInput })
    return navigator.clipboard.write([clipboardItemInput]).then(() => true)
  }
  /*
   * fallback to older browsers (including Safari)
   * if clipboard API not supported
   */
  const range = document.createRange()
  range.selectNode(editableElement)
  const select = window.getSelection()
  select?.removeAllRanges()
  select?.addRange(range)
  document.execCommand(`copy`)
  return Promise.resolve(true)
}

export default copyToClipboard
