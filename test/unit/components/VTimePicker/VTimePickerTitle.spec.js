import VTimePickerTitle from '@/components/VTimePicker/VTimePickerTitle'
import { test } from '@/test'

test('VTimePickerTitle.js', ({ mount }) => {
  it('should render component in 24hr', () => {
    const wrapper = mount(VTimePickerTitle, {
      propsData: {
        hour: 14,
        minute: 13,
        period: 'pm',
        ampm: false
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component in 12hr', () => {
    const wrapper = mount(VTimePickerTitle, {
      propsData: {
        hour: 14,
        minute: 13,
        period: 'pm',
        ampm: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component when selecting hour', () => {
    const wrapper = mount(VTimePickerTitle, {
      propsData: {
        hour: 14,
        minute: 13,
        period: 'pm',
        selectingHour: true
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should emit event when clicked on am/pm', async () => {
    const wrapper = mount(VTimePickerTitle, {
      propsData: {
        hour: 14,
        minute: 13,
        period: 'pm',
        ampm: true
      }
    })

    const period = jest.fn()
    wrapper.vm.$on('update:period', period)

    wrapper.find('.time-picker-title__ampm .picker__title__btn.active')[0].trigger('click')
    expect(period).not.toBeCalled()
    wrapper.find('.time-picker-title__ampm .picker__title__btn:not(.active)')[0].trigger('click')
    expect(period).toBeCalledWith('am')

    wrapper.setProps({
      hour: 2,
      minute: 13,
      period: 'am'
    })
    wrapper.find('.time-picker-title__ampm .picker__title__btn:not(.active)')[0].trigger('click')
    expect(period).toBeCalledWith('pm')
  })

  it('should emit event when clicked on hours/minutes', async () => {
    const wrapper = mount(VTimePickerTitle, {
      propsData: {
        hour: 14,
        minute: 13,
        period: 'pm'
      }
    })

    const selectingHour = jest.fn()
    wrapper.vm.$on('update:selectingHour', selectingHour)

    wrapper.find('.time-picker-title__time .picker__title__btn')[1].trigger('click')
    expect(selectingHour).not.toBeCalled()
    wrapper.find('.time-picker-title__time .picker__title__btn')[0].trigger('click')
    expect(selectingHour).toBeCalledWith(true)
    wrapper.setProps({ selectingHour: true })
    await wrapper.vm.$nextTick()
    wrapper.find('.time-picker-title__time .picker__title__btn')[1].trigger('click')
    expect(selectingHour).toBeCalledWith(false)
  })
})
