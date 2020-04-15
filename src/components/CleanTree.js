import { h } from 'hyperapp'

export default (props) => 
  h('div', null, [
      h('h2', null, [props.trees.fields.genre])
  ])