/**
 * @description echarts plugin test
 * @author Leo
 */

import createEditor from '../utils/create-editor'
import withECharts from '../../src/module/plugin'
import { EChartsElement } from '../../src/module/custom-types'

describe('echarts plugin', () => {
  const editor = withECharts(createEditor())
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

  it('isInline', () => {
    expect(editor.isInline(echartsElem)).toBe(true)
  })

  it('isVoid', () => {
    expect(editor.isVoid(echartsElem)).toBe(true)
  })
})
