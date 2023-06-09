import { atom, selector } from 'recoil'
import readme from 'constants/readme'
import { isExternal } from 'utils/link'

export const initialMarkdownState = atom<string>({
  key: 'initialMarkdownState',
  default: readme,
})

export const markdownState = atom<string>({
  key: 'markdownState',
  default: readme,
})

interface LinkProps {
  text: string
  href: string
}

// eslint-disable-next-line no-useless-escape
const linkRegExp = /(?<!!)\[([^\[\]]+)\]\(([^\(\)]*)\)/gi

export const linksState = selector<LinkProps[]>({
  key: 'linksState',
  get: ({ get }) => {
    const markdown = get(markdownState)
    const array = Array.from(markdown.matchAll(linkRegExp)).map(([, text, href]) => ({ text, href }))
    const indexMap = new Map<string, number>()
    array.map(({ href }, index) => ({ href, index })).forEach(({ href, index }) => indexMap.has(href) || indexMap.set(href, index))
    return array.filter(({ href }, index) => indexMap.get(href) === index)
  },
})

export const referLinksState = selector({
  key: 'referLinksState',
  get: ({ get }) => {
    const links = get(linksState)
    return links.filter(({ href }) => isExternal(href))
  },
})
