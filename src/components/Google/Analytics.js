import React, { Component, Fragment } from "react";
import { Line as LineChart } from "react-chartjs-2";
import { connect } from "react-redux";
import dayjs from "dayjs";
import * as actions from "../../actions";
import requireAuth from "../Hoc/requireAuth";

class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem("token"),
      chartData: {},
      gaOptions: {
        date: {
          start: "30daysAgo",
          end: dayjs(new Date()).format("YYYY-MM-DD")
        },
        metrics: ["ga:hits", "ga:sessions", "ga:users"],
        user: {},
        property: "",
        access: ""
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
    if (auth) {
      this.props.getAnalyticsProfile(this.state.token);
      // this.props.getAnalyticsData(this.state.gaOptions);
    }
  }

  // TODO: add more dimsets
  componentWillReceiveProps(nextProps) {
    this.chartData = { labels: [], datasets: [] };
    try {
      if (nextProps.google.user) {
        const user = nextProps.google.user;
        this.setState({
          user: user
        });
      }
      if (nextProps.google.analytics) {
        console.log(nextProps.google.analytics);
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
      return;
    }
  }

  renderDropdown = () => {
    if (this.state.user) {
      const { user } = this.state;
      return user.properties.map(site => {
        return (
          <option key={site.website} value={site.id}>
            {site.name}
          </option>
        );
      });
    }
  };

  datePicked = e => {
    const { name, value } = e.target;
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

  handleDropdownChange = e => {
    this.setState({
      gaOptions: {
        ...this.state.gaOptions,
        property: e.target.value,
        access: this.state.user.access
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.getAnalyticsData(this.state.gaOptions);
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
              <form onSubmit={this.onSubmit}>
                <select
                  onChange={this.handleDropdownChange}
                  className="form-control"
                >
                  {this.renderDropdown()}
                </select>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    onChange={this.datePicked}
                    type="date"
                    name="start"
                    max="3000-12-31"
                    min="1000-01-01"
                    className="form-control"
                    value={dayjs(new Date())
                      .subtract(30, "day")
                      .format("YYYY-MM-DD")}
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
                    value={dayjs(new Date()).format("YYYY-MM-DD")}
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
