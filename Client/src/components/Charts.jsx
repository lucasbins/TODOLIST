import { Pie } from 'react-chartjs-2';
import React, { Component } from 'react';

class Chart extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            chartData: {
                labels: ['Tarefas Concluidas', 'Tarefas nao concluidas'],
                datasets: [{
                    label: 'Tarefas',
                    data: [props.concluida, props.naoConcluida],
                    backgroundColor: ['#5d0cff', 'red']
                }]

            }
        }
    }


    render() {
        return (
            <div className="chart">
                <Pie
                    data={this.state.chartData}
                    options={{ responsive: true, plugins: { legend: { labels: { font: { size: 20 } } } } }} />
            </div>
        )
    }
}

export default Chart;