import { h } from 'hyperapp'

// import Button from '../components/Button'
import Chart from '../components/Chart'

export default (state, actions) =>
    h('div', {}, [
        h('h1', {}, 'Arbres fantastiques'),
        h(
            'p',
            { oncreate: () => actions.getTreesFromApi() }
        ),

        // Bar Chart
        Chart({
            labels: [],
            data:  [],
            title: 'Arbres par arrondissement',
            type: 'bar',
            width: 800,
            height: 400,
            callBack: (chart) => {
                actions.saveBarChart(chart)
            }
        }),

        // Line Chart
        Chart({
            labels: [],
            data:  [],
            title: 'Evolution de la population d\'arbres par années',
            type: 'line',
            width: 800,
            height: 400,
            callBack: (chart) => {
                actions.saveLineChart(chart)
            }
        })
    ])
