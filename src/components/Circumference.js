import { h } from 'hyperapp'

export default (props) =>
    h('div', {class : 'todo-item__root'}, [
        h('p', null, [props.circonferenceencm]),
        h('p', null, [props.espece]),
        h('p', {}, [props.arrondissement])
    ])

   