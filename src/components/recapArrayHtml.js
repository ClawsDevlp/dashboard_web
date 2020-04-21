import { h } from 'hyperapp'
import OneLine from '../components/oneLineRecap'
// Creating only the structure of the array
export default (array, actions) => 
  h('table', {id: 'small_recap'}, [
    h('tr', null, [
        h('th', {scope: "col", onclick: () => actions.organiseByString("species")}, 'Espèce'),
        h('th', {scope: "col", onclick: () => actions.organiseByString("adress")}, 'Adresse'),
        h('th', {scope: "col", onclick: () => actions.organiseByString("district")}, 'Arrondissement'),
        h('th', {scope: "col", onclick: () => actions.organiseByNumber("circumference")}, 'Circonférence (en cm)'),
        h('th', {scope: "col", onclick: () => actions.organiseByNumber("height")}, 'Hauteur (en m)'),
        h('th', {scope: "col", onclick: () => actions.organiseByNumber("date")}, 'Année de plantation')
    ]),
      OneLine(array) // Calling here the file that will create all the lines
  ])