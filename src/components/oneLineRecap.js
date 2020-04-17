import { h } from 'hyperapp'

export default (elements) => 
    elements.map(
        element => (
            h('tr', {}, [
            h('td', {}, element.species),
            h('td', {}, element.adress),
            h('td', {}, element.district),
            h('td', {}, element.circumference),
            h('td', {}, element.height),
            h('td', {}, element.date)
        ])
    )
  )