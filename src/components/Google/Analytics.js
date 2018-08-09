import React, { Component, Fragment } from "react";
import axios from "axios";
import { Line as LineChart } from "react-chartjs-2";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {}
    };
    this.chartData = {
      labels: [],
      datasets: [
        {
          label: "Page Hits",
          data: []
        }
      ]
    };
    this.chartOptions = {
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
    };
  }

  componentDidMount() {
    try {
      this.getData().then(data => {
        this.setState({
          chartData: data
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getData() {
    return axios.get("http://localhost:5000/ga").then(ga => {
      for (let i = 0; i < ga.data.rows.length; i += 1) {
        this.chartData.labels.push(ga.data.rows[i][0]);
        this.chartData.datasets[0].data.push(ga.data.rows[i][1]);
      }
      return this.chartData;
    });
  }

  render() {
    const { chartData } = this.state;
    return (
      <Fragment>
        <h4>Analytics View</h4>
        <LineChart data={chartData} options={this.chartOptions} />
      </Fragment>
    );
  }
}

export { Analytics };

export default connect(
  null,
  actions
)(Analytics);
