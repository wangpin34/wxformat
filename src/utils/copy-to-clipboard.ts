/*
 * Defference Between Copy using Clipboard API(the write API) and document.execCommand('copy')
 * 1. Clipboard API works async, document.execCommand('copy') works sync.
 * 2. Clipboard API works on content, e.g. HTML. You can save html anywhere and copy using Clipboard API. But, document.execCommand('copy') indrectly relys on the DOM object. That means you have to pass the ref of the DOM object. It's not easy for FP actually.
 * 3. Clipboard API works on content, e.g. HTML, that means the content should contain everything. For rich text copy & paste, it's required to apply all styles directly to the HTML so that the copy works. This is a limitation for complex use case. But not a problem for  document.execCommand('copy'). This time, document.execCommand('copy') wins.
 *
 * Any way, choose what suits your requirements. In my opinion, Clipboard API looks nices, but for some cases such as rich text copy & paste, it's bad.
 *
 * @2021-12-15. Pengson Wang <guyusay@gmail.com>
 *
 */
async function copyToClipboard(editableElement: HTMLElement, useExecCmd = false): Promise<boolean> {
  if (!useExecCmd && navigator.clipboard) {
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
  setTimeout(() => {
    select?.removeAllRanges()
  })

  return Promise.resolve(true)
}

export default copyToClipboard
