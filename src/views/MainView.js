import { h } from 'hyperapp'

// import Button from '../components/Button'
// import BarChart from '../components/BarChart'
import htmlArray from '../components/recapArrayHtml'

export default (state, actions) =>
    h('div', {}, [
        h('h1', {}, 'Essai affichage infos API'),
        h(
            'p',
            { oncreate: () => actions.getTreesFromApi() },
            'Liste d\'arbres :'// + state.trees.map( x => x.objectid)
        ),
        h( 'p',
            {},
            'Recap array : '// + state.recapArray
        ),
        htmlArray(state.recapArray)
        /* h('p', {}, 'count :' + state.count),
        Button({ text: '-', onClick: actions.decrement }),
        Button({ text: '+', onClick: actions.increment }),
        BarChart({
            labels: ['React', 'Angular', 'Vue', 'Hyperapp', 'Omi'],
            data: [135850, 52122, 148825, 16939, 9763],
            title: 'exemple de BarChart',
            width: 800,
            height: 400
        }),
        BarChart({
            labels: [],
            data:  [],
            title: 'nombre d\'espaces verts par catégories',
            width: 800,
            height: 400,
            callBack: (chart) => { // je défini ici une fonction de callback qui va être appellé après la création de mon diagramme
                actions.getEspaceVertsDataFromApi({ // je fait un appel à l'action getEspaceVertsDataFromApi qui fait un appel à une base de donnée
                    count: 200, // je lui passe en paramètre le nombre de ligne que je veux appeler via mon api
                    callBack: (labels, data) => { // et une autre fonction de callBack qui sera appellé seulement après que mes données aient été reçus
                        // ce qui me permet de mettre à jour l'affichage de mon diagramme qu'à ce moment là, une fois les données reçus
                        chart.data.labels = labels
                        chart.data.datasets[0].data = data
                        chart.update({duration: 800})
                    }
                })
            }
        }) */
    ])
