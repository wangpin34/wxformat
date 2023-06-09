export function downloadText(text: string, filename: string, filetype: string) {
  var a = document.createElement('a')
  a.style.display = 'block'
  var file = new Blob([text], { type: filetype })
  a.href = URL.createObjectURL(file)
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
