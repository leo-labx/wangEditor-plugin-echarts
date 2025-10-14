/**
 * @description ECharts module entry
 * @author Leo
 */

import './local' // 多语言

import { IModuleConf } from '@wangeditor/editor'
import withECharts from './plugin'
import renderElemConf from './render-elem'
import elemToHtmlConf from './elem-to-html'
import parseHtmlConf from './parse-elem-html'
import { insertEChartsMenuConf, editEChartsMenuConf } from './menu/index'

const module: Partial<IModuleConf> = {
  editorPlugin: withECharts,
  renderElems: [renderElemConf],
  elemsToHtml: [elemToHtmlConf],
  parseElemsHtml: [parseHtmlConf],
  menus: [insertEChartsMenuConf, editEChartsMenuConf],
}

export default module
