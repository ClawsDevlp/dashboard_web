import { h } from 'hyperapp'
import Chart from 'chart.js'

Chart.defaults.global.defaultFontFamily = "Ubuntu";
Chart.defaults.global.defaultFontColor = "rgb(90, 193, 143)";

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
                            backgroundColor: 'rgba(90, 193, 143, 0.8)',
                            data: props.data
                        }]
                    },
                    options: {
                        legend: {
                            display: false,
                        }
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
