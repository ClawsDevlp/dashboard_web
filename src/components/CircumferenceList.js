import { h } from 'hyperapp'

// List of the element of the TOP 3 for Circumference in cm
export default (props) =>
    h('div', {class : 'todo-item__root'}, [
        h('p', null, [h('span', null, props.circonferenceencm + ' cm : '),  props.espece + ', ' + props.arrondissement])
    ])

   