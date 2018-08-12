import React, { Component, Fragment } from "react";
import { Line as LineChart } from "react-chartjs-2";
import {
  googleGetAuthResponse,
  GoogleAPI,
  GoogleLogin,
  GoogleLogout
} from "react-google-oauth";
import { connect } from "react-redux";
import dayjs from "dayjs";
import * as actions from "../../actions";
import requireAuth from "../Hoc/requireAuth";

class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
      gaOptions: {
        date: {
          start: "30daysAgo",
          end: dayjs(new Date()).format("YYYY-MM-DD")
        },
        metrics: ["ga:hits", "ga:sessions", "ga:users"]
      }
    };
    this.chartData = {
      labels: [],
      datasets: []
    };
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true,
        mode: "index"
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
    // auth check to ensure no memory leak from React Router
    // ~.../react/warning.js:33
    const { auth } = this.props;
    if (auth.p) {
      this.props.getAnalyticsData(this.state.gaOptions);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.chartData = { labels: [], datasets: [] };
    try {
      if (nextProps.google.analytics) {
        const ga = nextProps.google.analytics;
        const metrics = ga.rows[0];

        for (let opt = 0; opt < metrics.length - 1; opt += 1) {
          let color = this.getRandomColor();
          this.chartData.datasets.push({
            label: ga.query.metrics[opt],
            data: [],
            backgroundColor: color,
            borderColor: color,
            hoverBackgroundColor: color,
            hoverBorderColor: color
          });
        }

        this.chartData.labels = ga.rows.map((row, i) => {
          return dayjs(row[0]).format("MM/DD/YY");
        });

        this.chartData.datasets.forEach((set, j) => {
          for (let i = 0; i < ga.rows.length; i += 1) {
            let metric = ga.rows[i][j + 1];
            set.data.push(metric);
          }
        });

        this.setState({
          chartData: this.chartData
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  datePicked = e => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState({
      gaOptions: {
        ...this.state.gaOptions,
        date: {
          ...this.state.gaOptions.date,
          [name]: value
        }
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.getAnalyticsData(this.state.gaOptions);
  };

  signInGoogle = anything => {
    console.log(googleGetAuthResponse());
  };

  signInGoogleFailure = anything => {
    console.log(anything);
  };

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color + "b1"; // set hex opacity and return
  }

  render() {
    return (
      <Fragment>
        <h4>Analytics View</h4>
        <section className="container-fluid">
          <div className="row">
            <div className="col-3">
              <GoogleAPI
                scope="https://www.googleapis.com/auth/analytics"
                clientId="1073870169812-bafkb4lbgja190m4fe7954b6ihpgdgnf.apps.googleusercontent.com"
                onUpdateSigninStatus={this.signInGoogle}
                onInitFailure={this.signInGoogleFailure}
              >
                <div>
                  <div>
                    <GoogleLogin />
                  </div>
                  <div>
                    <GoogleLogout />
                  </div>
                </div>
              </GoogleAPI>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    onChange={this.datePicked}
                    type="date"
                    name="start"
                    max="3000-12-31"
                    min="1000-01-01"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    onChange={this.datePicked}
                    type="date"
                    name="end"
                    min="1000-01-01"
                    max={dayjs(new Date()).format("YYYY-MM-DD")}
                    className="form-control"
                  />
                </div>
                <input className="btn btn-dark" type="submit" />
              </form>
            </div>
            <div style={{ position: "relative" }} className="col-9">
              <LineChart
                height={600}
                data={this.state.chartData}
                options={this.chartOptions}
              />
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    google: state.google
  };
}

export default connect(
  mapStateToProps,
  actions
)(requireAuth(Analytics));
