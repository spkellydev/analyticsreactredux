import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Line as LineChart }  from 'react-chartjs-2'
import { connect } from "react-redux";
import * as actions from 'actions'

class Analytics extends Component {
    state = {
        chartData: {}
    }
    chartData = {
        labels: [],
        datasets: [{
            label: 'Page Hits',
            data: []
        }],
    }

    chartOptionsn = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
        enabled: true
        },
        scales: {
        xAxes: [
            {
            ticks: {
                autoSkip: true,
                maxTicksLimit: 10
            }
            }
        ]
        }
    }

    async getData() {
        return axios.get('/ga').then(ga => {
            for(var i =0; i < ga.data.rows.length; i++) {
                this.chartData.labels.push(ga.data.rows[i][0])
                this.chartData.datasets[0].data.push(ga.data.rows[i][1])
            }
            return this.chartData
        })
    }

    componentDidMount() {
        this.getData().then(data => {
            this.setState({
                chartData: data
            })
            
        })
    }

    render() {

        return (
            <Fragment>
                <h4>Analytics View</h4>
                <LineChart data={this.state.chartData} options={this.chartOptions} />
            </Fragment>
        )
    }
}

export default connect(null, actions)(Analytics)