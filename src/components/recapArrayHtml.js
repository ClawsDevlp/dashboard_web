import { h } from 'hyperapp'
import OneLine from '../components/oneLineRecap'

export default (array, actions) => 
  h('table', {id: 'small_recap'}, [
    h('tr', null, [
        h('th', {scope: "col"}, [
          'Espèce',
          h('input', {type: 'button', onclick: actions.organiseBySpecies, value: 'v'})
        ]),
        h('th', {scope: "col", onclick: actions.organiseByAdress}, 'Adresse'),
        h('th', {scope: "col"}, 'Arrondissement'),
        h('th', {scope: "col"}, 'Circonférence (en cm)'),
        h('th', {scope: "col"}, 'Hauteur (en m)'),
        h('th', {scope: "col"}, 'Date')
    ]),
      OneLine(array)
  ])