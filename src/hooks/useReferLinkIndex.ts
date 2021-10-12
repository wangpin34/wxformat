import { useRecoilValue } from 'recoil'
import { referLinksState } from '../states/link'

function useReferLinkIndex(href: string) {
  const links = useRecoilValue(referLinksState)
  return links.findIndex((link) => link.href === href)
}

export default useReferLinkIndex
