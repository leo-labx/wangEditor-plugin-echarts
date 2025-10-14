/**
 * @description insert ECharts menu test
 * @author Leo
 */

import { SlateEditor } from '@wangeditor/editor'
import createEditor from '../../utils/create-editor'
import { EChartsElement } from '../../../src/module/custom-types'
import InsertEChartsMenu from '../../../src/module/menu/InsertECharts'
import withECharts from '../../../src/module/plugin'

describe('insert echarts menu', () => {
  const editor = withECharts(createEditor())
  const startLocation = SlateEditor.start(editor, [])
  const menu = new InsertEChartsMenu()

  function genEChartsElem() {
    const echartsElem: EChartsElement = {
      type: 'echarts',
      value: `
    {
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
    }
  `,
      height: '300',
      width: '500',
      children: [{ text: '' }],
    }
    return echartsElem
  }

  it('getValue', () => {
    expect(menu.getValue(editor)).toBe('')
  })

  it('getHeight', () => {
    expect(menu.getHeight(editor)).toBe('300')
  })

  it('getWidth', () => {
    expect(menu.getWidth(editor)).toBe('500')
  })

  it('isActive', () => {
    expect(menu.isActive(editor)).toBe(false)
  })

  it('isDisabled', () => {
    // 选中空编辑器
    editor.select(startLocation)
    expect(menu.isDisabled(editor)).toBeFalsy()

    // 选中 ECharts 节点
    editor.insertNode(genEChartsElem())
    editor.select({ path: [0, 1, 0], offset: 0 })
    expect(menu.isDisabled(editor)).toBeTruthy()
  })

  it('getModalPositionNode', () => {
    expect(menu.getModalPositionNode(editor)).toBeNull()
  })

  it('getModalContentElem', () => {
    const elem = menu.getModalContentElem(editor)
    expect(elem.tagName).toBe('DIV')
  })
})
