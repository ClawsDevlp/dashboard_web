import { h } from 'hyperapp'
import OneLine from '../components/oneLineRecap'
// Creating only the structure of the array
export default (array, actions) => 
  h('table', {id: 'small_recap'}, [
    h('tr', null, [
        h('th', {scope: "col", onclick: actions.organiseBySpecies}, 'Espèce'),
        h('th', {scope: "col", onclick: actions.organiseByAdress}, 'Adresse'),
        h('th', {scope: "col", onclick: actions.organiseByDistrict}, 'Arrondissement'),
        h('th', {scope: "col", onclick: actions.organiseByCirc}, 'Circonférence (en cm)'),
        h('th', {scope: "col", onclick: actions.organiseByHeight}, 'Hauteur (en m)'),
        h('th', {scope: "col", onclick: actions.organiseByDate}, 'Année de plantation')
    ]),
      OneLine(array) // Calling here the file that will create all the lines
  ])