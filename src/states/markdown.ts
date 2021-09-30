import { atom, selector } from 'recoil'
import readme from 'constants/readme'
import { isExternal } from 'utils/link'

export const markdownState = atom<string>({
  key: 'markdownState',
  default: readme,
})

interface LinkProps {
  text: string
  href: string
}

const linkRegExp = /(?<!!)\[([^\[\]]+)\]\(([^\(\)]*)\)/gi

export const linksState = selector<LinkProps[]>({
  key: 'linksState',
  get: ({ get }) => {
    return Array.from(get(markdownState).matchAll(linkRegExp)).map(([, text, href]) => ({ text, href }))
  },
})

export const referLinksState = selector({
  key: 'referLinksState',
  get: ({ get }) => {
    const links = get(linksState)
    return links.filter(({ href }) => isExternal(href))
  },
})
