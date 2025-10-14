/**
 * @description ECharts element
 * @author Leo
 */

type EmptyText = {
  text: ''
}

export type EChartsElement = {
  type: 'echarts'
  value: string
  height: string
  width: string
  children: EmptyText[]
}
