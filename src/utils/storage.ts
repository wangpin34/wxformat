import type { PreviewerPreferences } from 'types/preferences'
import * as yup from 'yup'

const PREFIX = 'wxformat.storage'
const PREVIEWER_PREFERENCES = 'previewer_preferences'

const defaultPreviewerPreferences = {
  fontSize: 14,
  color: '#ff7500'
}

const previewerPreferencesScheme = yup.object().shape({
  fontSize: yup.number().required(),
  color: yup.string().required(),
})

export function getPreviewerPreferences() {
  const str = localStorage.getItem(`${PREFIX}.${PREVIEWER_PREFERENCES}`)
  if (str) {
    const obj = JSON.parse(str)
    if (previewerPreferencesScheme.isValidSync(obj)) {
      return obj as PreviewerPreferences
    }
  }
  return defaultPreviewerPreferences
}

export function setPreviewerPreferences(preferences: PreviewerPreferences) {
  localStorage.setItem(`${PREFIX}.${PREVIEWER_PREFERENCES}`, JSON.stringify(preferences))
}
