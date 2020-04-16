import { h } from 'hyperapp'
import OneLine from '../components/oneLineRecap'

export default (array) => 
  h('table', null, [
    h('tr', null, [
        h('th', {scope: "col"}, 'Espèce'),
        h('th', {scope: "col"}, 'Adresse'),
        h('th', {scope: "col"}, 'Arrondissement'),
        h('th', {scope: "col"}, 'Circonférence (en cm)'),
        h('th', {scope: "col"}, 'Hauteur (en m)'),
        h('th', {scope: "col"}, 'Date')
    ]),
      OneLine(array)
  ])