/**
 * @description ECharts elem-to-html test
 * @author Leo
 */

import elemToHtmlConf from '../../src/module/elem-to-html'
import { EChartsElement } from '../../src/module/custom-types'

describe('echarts elem-to-html', () => {
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

  it('type', () => {
    expect(elemToHtmlConf.type).toBe('echarts')
  })

  it('elem to html', () => {
    const html = elemToHtmlConf.elemToHtml(echartsElem, '')
    expect(html).toBe(
      `<span data-w-e-type="echarts" data-w-e-is-void data-w-e-is-inline data-value="
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
  " data-height="300" data-width="500"></span>`
    )
  })
})
