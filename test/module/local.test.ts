/**
 * @description ECharts local test
 * @author Leo
 */

import '../../src/module/local'
import { i18nChangeLanguage, t } from '@wangeditor/editor'

describe('local', () => {
  it('zh-CN', () => {
    expect(t('echarts.echarts')).toBe('ECharts')
  })
  it('en', () => {
    i18nChangeLanguage('en')
    expect(t('echarts.echarts')).toBe('ECharts')
  })
})
