import { h } from 'hyperapp'

// import Button from '../components/Button'
import BarChart from '../components/BarChart'

export default (state, actions) =>
    h('div', {}, [
        h('h1', {}, 'Arbres fantastiques'),
        h(
            'p',
            { oncreate: () => actions.getTreesFromApi() },
            console.log("Data : " , state.districtData),
            //'Liste district arbres :' + state.districtData.nbTrees,
        ),

        BarChart({
            labels: [],
            data:  [],
            title: 'Arbres par arrondissement',
            width: 800,
            height: 400,
            callBack: (chart) => { // je défini ici une fonction de callback qui va être appellé après la création de mon diagramme
                //const list = await state.districtData
                //const disdis = actions.setTreeByDistrictArray(state.trees)
                //console.log("Data 2 : " , disdis)
                actions.saveChart(chart)

                //chart.data.labels = state.districtData.distictName
                //chart.data.datasets[0] = state.districtData.nbTrees
                //chart.update({duration: 800})
            }
        })
    ])
