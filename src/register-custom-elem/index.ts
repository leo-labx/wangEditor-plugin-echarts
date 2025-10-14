/**
 * @description 注册自定义 elem
 * @author Leo
 */

// @ts-ignore
import * as echarts from 'echarts'
import './native-shim'

class WangEditorEChartsCard extends HTMLElement {
  private span: HTMLElement
  private chart: echarts.ECharts | null = null

  // 监听的 attr
  static get observedAttributes() {
    return ['data-value', 'data-height', 'data-width']
  }

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    const document = shadow.ownerDocument

    const span = document.createElement('span')
    span.style.display = 'inline-block'
    span.style.width = '500px'
    span.style.height = '300px'
    shadow.appendChild(span)
    this.span = span
  }

  // connectedCallback() {
  //     // 当 custom element首次被插入文档DOM时，被调用
  //     console.log('connected')
  // }
  // disconnectedCallback() {
  //     // 当 custom element从文档DOM中删除时，被调用
  //     console.log('disconnected')
  // }
  // adoptedCallback() {
  //     // 当 custom element被移动到新的文档时，被调用
  //     console.log('adopted')
  // }
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (name === 'data-value') {
      if (oldValue == newValue) return
      this.render(newValue || '')
    }
    if (name === 'data-height') {
      if (oldValue == newValue) return
      this.resizeHeight(newValue || '')
    }
    if (name === 'data-width') {
      if (oldValue == newValue) return
      this.resizeWidth(newValue || '')
    }
  }

  private async render(value: string) {
    try {
      // 创建安全沙箱
      const sandbox = this.createSafeSandbox()

      // 在沙箱中执行
      const option = sandbox.run(`
      try {
        return (${value});
      } catch(e) {
        return { error: e.message };
      }
    `)

      if (option.error) {
        throw new Error(option.error)
      }

      if (!this.chart) {
        this.chart = echarts.init(this.span)
      }
      this.chart.setOption(option)
    } catch (error) {
      console.error('ECharts option parse error.', error)
      // 显示错误提示
      this.span.innerHTML =
        '<div style="color:red;padding:10px;text-align: center;">图表配置解析错误</div>'
    }
  }

  private createSafeSandbox() {
    // 创建安全的执行环境
    const sandbox = {
      echarts: this.getSafeEChartsProxy(),
      console: { log: () => {} },
      setTimeout: null,
      setInterval: null,
      // 其他需要限制的对象...
    }

    const proxy = new Proxy(sandbox, {
      has: () => true,
      get: (target: any, key) => {
        if (key === Symbol.unscopables) return undefined
        return target[key] || undefined
      },
    })

    return {
      run: (code: string) => {
        const fn = new Function('sandbox', `with(sandbox){${code}}`)
        return fn(proxy)
      },
    }
  }

  private getSafeEChartsProxy() {
    // 返回一个安全的echarts代理对象
    // 只暴露必要的API，过滤危险方法
    return new Proxy(echarts, {
      get: (target: any, key) => {
        const allowedMethods = ['init', 'registerTheme', 'registerMap', 'graphic']
        if (allowedMethods.includes(key as string)) {
          return target[key]
        }
        return undefined
      },
    })
  }

  private resizeHeight(height: string) {
    if (this.span && this.chart) {
      this.span.style.height = `${height}px`
      this.chart.resize()
    }
  }

  private resizeWidth(width: string) {
    if (this.span && this.chart) {
      this.span.style.width = `${width}px`
      this.chart.resize()
    }
  }
}

if (!window.customElements.get('w-e-echarts-card')) {
  window.customElements.define('w-e-echarts-card', WangEditorEChartsCard)
}
