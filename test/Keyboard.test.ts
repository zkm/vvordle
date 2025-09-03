import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Keyboard from '../src/Keyboard.vue'

function findButtonByText(wrapper: any, text: string) {
  const btn = wrapper.findAll('button').find((b: any) => b.text() === text)
  if (!btn) throw new Error(`Button with text ${text} not found`)
  return btn
}

describe('Keyboard', () => {
  it('emits key events for letter, Enter, and Backspace', async () => {
    const wrapper = mount(Keyboard, { props: { letterStates: {} } })

    // Letter 'a'
    await findButtonByText(wrapper, 'a').trigger('click')
    expect(wrapper.emitted('key')?.[0]).toEqual(['a'])

    // Enter
    await findButtonByText(wrapper, 'Enter').trigger('click')
    expect(wrapper.emitted('key')?.some(args => args[0] === 'Enter')).toBe(true)

    // Backspace (button has no text, contains an SVG)
    const backspaceBtn = wrapper.findAll('button').find((b: any) => b.text() === '' && b.find('svg').exists())
    expect(backspaceBtn).toBeTruthy()
    await backspaceBtn!.trigger('click')
    expect(wrapper.emitted('key')?.some(args => args[0] === 'Backspace')).toBe(true)
  })
})
