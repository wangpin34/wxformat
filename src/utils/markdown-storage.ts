const KEY = 'wxformat.markdown'

export function read() {
  return localStorage.getItem(KEY)
}

export function write(markdown: string) {
  return localStorage.setItem(KEY, markdown)
}
