import { h } from 'hyperapp'

// List of the element of the TOP 3 for Height
export default (props) =>
    h('div', {class : 'list'}, [
        h('p', null, [h('span', null, props.hauteurenm + ' m : '),  props.espece + ', ' + props.arrondissement])
    ])

   