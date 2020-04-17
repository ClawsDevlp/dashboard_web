import { h } from 'hyperapp'

export default (props) =>
    h('div', {class : 'todo-item__root'}, [
        h('p', null, [h('span', null, props.hauteurenm + ' m : '),  props.espece + ', ' + props.arrondissement])
    ])

   