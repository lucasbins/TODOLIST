import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            chartData: {
                labels: ['Sem Pressa', 'Importante', 'Urgente'],
                datasets: [{
                    label: '',
                    data: [props.semPressa, props.importante, props.urgente],
                    backgroundColor: ['green', 'yellow', 'red']
                }]

            }
        }


    }

    render() {
        return (
            <div className="bar">
                <Bar
                    data={this.state.chartData} />
            </div>
        )
    }
}

export default Chart;