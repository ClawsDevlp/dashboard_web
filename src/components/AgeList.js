import { h } from 'hyperapp'

// List of the element of the TOP 3 for Age
export default (props) =>
    h('div', {class : 'todo-item__root'}, [
        h('p', null, [h('span', null, props.age + ' ans : '),  props.espece + ', ' + props.arrondissement])
    ])

   