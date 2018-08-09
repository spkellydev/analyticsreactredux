import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import * as actions from 'actions'

class Analytics extends Component {
    getData() {
        let data = axios.get('/ga');
    }

    render() {
        return (
            <Fragment>
                <h4>Analytics View</h4>
            </Fragment>
        )
    }
}

export default connect(null, actions)(Analytics)