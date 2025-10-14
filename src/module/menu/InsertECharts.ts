/**
 * @description insert ECharts menu
 * @author Leo
 */

import { IModalMenu } from '@wangeditor/editor'
import {
  DomEditor,
  IDomEditor,
  SlateNode,
  SlateRange,
  t,
  genModalTextareaElems,
  genModalInputElems,
  genModalButtonElems,
} from '@wangeditor/editor'
import { ECHARTS_SVG } from '../../constants/icon-svg'
import $, { Dom7Array, DOMElement } from '../../utils/dom'
import { genRandomStr } from '../../utils/util'
import { EChartsElement } from '../custom-types'

/**
 * 生成唯一的 DOM ID
 */
function genDomID(): string {
  return genRandomStr('w-e-insert-echarts')
}

class InsertEChartsMenu implements IModalMenu {
  readonly title = t('echarts.insert')
  readonly iconSvg = ECHARTS_SVG
  readonly tag = 'button'
  readonly showModal = true // 点击 button 时显示 modal
  readonly modalWidth = 300
  private $content: Dom7Array | null = null
  private readonly textareaId = genDomID()
  private readonly heightInputId = genDomID()
  private heighInputValue = '300'
  private readonly widthInputId = genDomID()
  private widthInputValue = '500'
  private readonly buttonId = genDomID()

  getValue(editor: IDomEditor): string | boolean {
    // 插入菜单，不需要 value
    return ''
  }

  /**
   * 获取ECharts height
   * @param editor editor
   */
  getHeight(editor: IDomEditor): string | boolean {
    return this.heighInputValue
  }

  /**
   * 获取ECharts width
   * @param editor editor
   */
  getWidth(editor: IDomEditor): string | boolean {
    return this.widthInputValue
  }

  isActive(editor: IDomEditor): boolean {
    // 任何时候，都不用激活 menu
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    // 点击菜单时，弹出 modal 之前，不需要执行其他代码
    // 此处空着即可
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (SlateRange.isExpanded(selection)) return true // 选区非折叠，禁用

    const selectedElems = DomEditor.getSelectedElems(editor)

    const hasVoidElem = selectedElems.some(elem => editor.isVoid(elem))
    if (hasVoidElem) return true // 选中了 void 元素，禁用

    const hasPreElem = selectedElems.some(elem => DomEditor.getNodeType(elem) === 'pre')
    if (hasPreElem) return true // 选中了 pre 原则，禁用

    return false
  }

  getModalPositionNode(editor: IDomEditor): SlateNode | null {
    return null // modal 依据选区定位
  }

  getModalContentElem(editor: IDomEditor): DOMElement {
    const { textareaId, heightInputId, widthInputId, buttonId } = this
    let { heighInputValue, widthInputValue } = this

    const [textareaContainerElem, textareaElem] = genModalTextareaElems(
      t('echarts.echarts'),
      textareaId,
      t('echarts.placeholder')
    )
    const $textarea = $(textareaElem)
    const [heightInputContainerElem, heightInputElem] = genModalInputElems(
      '高度',
      heightInputId,
      t('echarts.height')
    )
    const $heightInput = $(heightInputElem)
    const [widthInputContainerElem, widthInputElem] = genModalInputElems(
      '宽度',
      widthInputId,
      t('echarts.width')
    )
    const $widthInput = $(widthInputElem)
    const [buttonContainerElem] = genModalButtonElems(buttonId, t('echarts.ok'))

    if (this.$content == null) {
      // 第一次渲染
      const $content = $('<div></div>')

      // 绑定事件（第一次渲染时绑定，不要重复绑定）
      $content.on('click', `#${buttonId}`, e => {
        e.preventDefault()
        const value = $content.find(`#${textareaId}`).val().trim()
        const height = $content.find(`#${heightInputId}`).val().trim()
        heighInputValue = height
        const width = $content.find(`#${widthInputId}`).val().trim()
        widthInputValue = width
        this.insertECharts(editor, value, height, width)
        editor.hidePanelOrModal() // 隐藏 modal
      })

      // 记录属性，重要
      this.$content = $content
    }

    const $content = this.$content
    $content.html('') // 先清空内容

    // append textarea、input and button
    $content.append(textareaContainerElem)
    $content.append(heightInputContainerElem)
    $content.append(widthInputContainerElem)
    $content.append(buttonContainerElem)

    // 设置 input val
    $textarea.val('')
    $heightInput.val('300')
    $widthInput.val('500')

    // focus 一个 input（异步，此时 DOM 尚未渲染）
    setTimeout(() => {
      $textarea.focus()
    })

    return $content[0]
  }

  private insertECharts(editor: IDomEditor, value: string, height: string, width: string) {
    if (!value) return

    // 还原选区
    editor.restoreSelection()

    if (this.isDisabled(editor)) return

    const echartsElem: EChartsElement = {
      type: 'echarts',
      value,
      height: height ? height : '300',
      width: width ? width : '500',
      children: [{ text: '' }], // void node 需要有一个空 text
    }
    editor.insertNode(echartsElem)
  }
}

export default InsertEChartsMenu
