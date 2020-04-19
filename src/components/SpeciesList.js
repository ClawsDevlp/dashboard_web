import { h } from 'hyperapp'

// List of the element of the TOP 3 for Species
export default (props) =>
    h('div', {class : 'list'}, [
        h('p', null, [h('span', null, props.name + ' : '),  props.value + ' arbres'])
    ])
