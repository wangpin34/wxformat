import { atom } from 'recoil'
import { nanoid } from 'nanoid'

// dom id for reference

const rendererState = atom<string>({
  key: 'rendererState',
  default: nanoid(),
})

export { rendererState }
