import { h } from 'hyperapp'
import Chart from 'chart.js'

export default (props) =>
    h('div', {}, [
        h('canvas', {
            oncreate: (element) => {
                const ctx = element.getContext('2d')
                const c = new Chart(ctx, {
                    type: props.type,
                    data: {
                        labels: props.labels,
                        datasets: [{
                            label: props.title || 'default title',
                            data: props.data
                        }]
                    },
                    responsive: true
                })
                c.canvas.style.height = props.height + 'px'
                c.canvas.style.width = props.width + 'px'
                // callback function
                if(props.callBack !== undefined) { props.callBack(c) }
            },
            style: 'background-color: #fff;'
        })
    ])
