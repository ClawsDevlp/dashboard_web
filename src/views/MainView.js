import { h } from 'hyperapp'
import htmlArray from '../components/recapArrayHtml'

export default (state, actions) =>
    h('div', {oncreate: () => actions.getTreesFromApi()}, [
        h('div', {class: "container array"}, [
            h('h3', {}, [
                h('span', {}, '📖 DATA'),
                'Un petit récapitulatif 👀']),
            htmlArray(state.recapArray, actions) // Calling the file to create the array
        ])
    ])
