import { h } from 'hyperapp'

// Creates the differents line of the array depending on the array passed by argument
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