import { atom, selector } from 'recoil'
import {} from 'lodash'
import editorThemes, { Theme } from 'constants/editorThemes'

interface EditorPreferences {
  theme: Theme
  fontSize: number
}

export const editorPreferencesState = atom<EditorPreferences>({
  key: 'editorPreferencesState',
  default: {
    theme: editorThemes[0],
    fontSize: 16,
  },
})

enum FontWeight {
  Lighter = 'lighter',
  Normal = 'normal',
  Bold = 'bold',
  Bolder = 'bolder',
}

interface Font {
  size: number | string
  lineHeight: number | string
  weight: FontWeight | number
}

type Color = string

type TextPreferences = Font & { color: Color }

function createTextPreferences(
  size: number | string,
  lineHeight: number | string = 1.5,
  weight: FontWeight | number = FontWeight.Normal,
  color: Color = '#3f3f3f'
) {
  return { size, lineHeight, weight, color } as TextPreferences
}

interface RendererTheme {
  fonts?: {
    head1?: TextPreferences
    head2?: TextPreferences
    p?: TextPreferences
    blockquote?: TextPreferences
    achor?: TextPreferences
    strong?: TextPreferences
    inlineCode?: TextPreferences
    image?: {
      width: 'fullwidth' | number
      position: 'left' | 'center' | 'right'
    }
    //Todo, codeblock
  }
}

const defaulttheme = {
  fonts: {
    head1: createTextPreferences('140%', 1),
    head2: createTextPreferences('120%', 1.5, FontWeight.Bold),
    p: createTextPreferences('16px', 1.6, FontWeight.Bold),
  },
}

interface RendererPreferences {
  theme?: RendererTheme
  config?: RendererTheme
}

const defaultRenderPreferences: RendererPreferences = {
  theme: defaulttheme,
}

export const rendererPreferencesState = atom<RendererPreferences>({
  key: 'rendererPreferencesState',
  default: defaultRenderPreferences,
})

export const rendererThemeState = selector<RendererTheme>({
  key: 'rendererPreferencesState',
  get: ({ get }) => {
    const preferences = get(rendererPreferencesState)
    return { ...preferences.theme, ...preferences.config }
  },
})
