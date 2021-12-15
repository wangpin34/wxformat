import { atom } from 'recoil'
import { nanoid } from 'nanoid'

// dom id for reference

const rendererState = atom<string>({
  key: 'rendererState',
  /**
   * In the begining, I use follow script to gen an ID.
   * ```javascript
   * `Math.random()`.slice(2)
   *
   * ```
   * But document.querySelector has such a limitation that I hadn't aware.
   * querySelector method uses CSS3 selectors for querying the DOM and CSS3 doesn't support ID selectors that start with a digit:
   * > In CSS, identifiers (including element names, classes, and IDs in selectors) can contain only the characters [a-zA-Z0-9] and ISO 10646 characters U+00A0 and higher, plus the hyphen (-) and the underscore (_); they cannot start with a digit, two hyphens, or a hyphen followed by a digit.
   *
   * Use document.getElementByid() is OK. But I think it's a good change to accept the issue and use a real id gen. In here, it's nanoid.
   */
  default: nanoid(),
})

export { rendererState }
