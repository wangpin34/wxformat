// available themes are at https://codemirror.net/theme/
// To enable a theme, import the css ([theme-name].css) and also set theme property of the editor
const editorThemes = [
  '3024-day',
  '3024-night',
  'abbott',
  'abcdef',
  'ambiance-mobile',
  'ambiance',
  'ayu-dark',
  'ayu-mirage',
  'base16-dark',
  'base16-light',
  'bespin',
  'blackboard',
  'cobalt',
  'colorforth',
  'darcula',
  'dracula',
  'duotone-dark',
  'duotone-light',
  'eclipse',
  'elegant',
  'erlang-dark',
  'gruvbox-dark',
  'hopscotch',
  'icecoder',
  'idea',
  'isotope',
  'juejin',
  'lesser-dark',
  'liquibyte',
  'lucario',
  'material-darker',
  'material-ocean',
  'material-palenight',
  'material',
  'mbo',
  'mdn-like',
  'midnight',
  'monokai',
  'moxer',
  'neat',
  'neo',
  'night',
  'nord',
  'oceanic-next',
  'panda-syntax',
  'paraiso-dark',
  'paraiso-light',
  'pastel-on-dark',
  'railscasts',
  'rubyblue',
  'seti',
  'shadowfox',
  'solarized',
  'ssms',
  'the-matrix',
  'tomorrow-night-bright',
  'tomorrow-night-eighties',
  'ttcn',
  'twilight',
  'vibrant-ink',
  'xq-dark',
  'xq-light',
  'yeti',
  'yonce',
  'zenburn',
] as const

type Themes = typeof editorThemes
type Mapper = {
  [key in Themes[number]]: string
}
export type Theme = keyof Mapper

export default editorThemes
