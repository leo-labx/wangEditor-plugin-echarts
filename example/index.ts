/**
 * @description examples entry
 * @author Leo
 */

import { createEditor, createToolbar, Boot, i18nChangeLanguage } from '@wangeditor/editor'
import module from '../src/index'

Boot.registerModule(module)

// i18nChangeLanguage('en')

// 创建编辑器
const editor = createEditor({
  selector: '#editor-container',
  config: {
    hoverbarKeys: {
      echarts: {
        menuKeys: ['editECharts'], // “编辑”菜单
      },
    },
    onChange(editor) {
      const html = editor.getHtml()
      // @ts-ignore
      document.getElementById('text-html').value = html
      const contentStr = JSON.stringify(editor.children, null, 2)
      // @ts-ignore
      document.getElementById('text-json').value = contentStr
    },
  },
  // content: [
  //   {
  //     // @ts-ignore
  //     type: 'paragraph',
  //     children: [
  //       { text: 'hello world' },
  //       // @ts-ignore
  //       { type: 'echarts', value: 'c = \\pm\\sqrt{a^1 + b^2}', children: [{ text: '' }] },
  //     ],
  //   },
  // ],
  html: `<p><span data-w-e-type="echarts" data-w-e-is-void data-w-e-is-inline data-value="{
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}" data-height="300" data-width="500"></span></p><p><br></p>`,
})
const toolbar = createToolbar({
  editor,
  selector: '#toolbar-container',
  config: {
    insertKeys: {
      index: 0,
      keys: ['insertECharts'], // “插入”菜单
    },
  },
})

// @ts-ignore 为了便于调试，暴露到 window
window.editor = editor
// @ts-ignore
window.toolbar = toolbar
