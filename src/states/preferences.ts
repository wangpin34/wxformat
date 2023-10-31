import { atom, selector } from 'recoil'
import { getPreviewerPreferences } from 'utils/storage'

export const previewerPreferencesState = atom({
  key: 'previewerPreferencesState',
  default: getPreviewerPreferences(),
})
