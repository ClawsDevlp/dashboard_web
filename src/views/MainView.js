import { h } from 'hyperapp'
import htmlArray from '../components/recapArrayHtml'


import TopCircumference from '../components/TopCircumference'
import TopAge from '../components/TopAge'
import TopHeight from '../components/TopHeight'
import TopSpecies from '../components/TopSpecies'
import Chart from '../components/Chart'

export default (state, actions) =>

    h('div', {}, [
        h('h1', {class : 'titre'}, [
            h('span', null, 'DATAVISUALISATION  '),
            h('p', null, 'Les arbres remarquables à Paris  🌱')
        ]),
        h(
            'div',
            { oncreate: () => actions.getTreesFromApi(), class : 'wrapper'},
            [
            TopSpecies({
                species: state.speciesNumber
            }),
            TopAge({
                trees: state.trees
            }),  
            TopCircumference({
                trees: state.trees
            }),
            TopHeight({
                trees: state.trees
            }),
            h('div', {class : 'container infos'}, [
                h('h3', null, [
                    h('span', null, ' 📌  INFOS '),
                    'Les chiffres impressionnants 😱'
                ]),
                h('div', {class: 'inside-wrapper'}, [
                    h('div', null, [
                        h('p', null,  state.trees.length ),
                        h('p', null, ' arbres remarquables ')
                    ]),
                    h('div', null, [
                        h('p', null,  state.trees.filter(i => i.dateplantation >= "2000-01-01T00:09:21+00:00").length),
                        h('p', null, ' arbres remarquables plantés depuis 2000 ')
                    ]),
                    h('div', null, [
                        h('p', null,  state.trees.filter(i => i.age >= 100).length ),
                        h('p', null, ' arbres de plus de 100 ans ')
                    ]),
                    h('div', null, [
                        h('p', null,  state.trees.filter(i => i.hauteurenm >= 20).length),
                        h('p', null, ' arbres de plus de 20 mètres ')
                    ])
    
                ])

            ]),

            h('div', {class: "container bar"}, [
                h('h3', {}, [
                    h('span', {}, '📊  DATA'),
                    'Le nombre d’arbres par arrondissements 🌎']),
                Chart({
                labels: [],
                data:  [],
                title: 'Arbres par arrondissement',
                type: 'bar',
                callBack: (chart) => {
                    actions.saveBarChart(chart)
                }
            })
            ]),

            h('div', {class: "container courbe"}, [
                h('h3', {}, [
                    h('span', {}, '📈  DATA'),
                    'Le nombre d’arbres par année 📅']),
            Chart({
                labels: [],
                data:  [],
                title: 'Evolution de la population d\'arbres par années',
                type: 'line',
                callBack: (chart) => {
                    actions.saveLineChart(chart)
                }
            })
            ]),

            h('div', {class: "container array"}, [
                h('h3', {}, [
                    h('span', {}, '📖 DATA'),
                    'Un petit récapitulatif 👀']),
                htmlArray(state.recapArray, actions) // Calling the file to create the array
            ]),

            h('p', {class: "coded"}, [ ' "réalisé avec 💚 par Bastien, Clara, Elisa, Lucie et Roxane" '
            ])
            
            ]

            
        )
        
    ])
