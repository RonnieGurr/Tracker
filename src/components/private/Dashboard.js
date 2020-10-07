import React from 'react';
import Navigation from './Navigation';
import Chart from "chart.js";

const Auth = require('../helpers/checkAuth');

class Dashboard extends React.Component {

    constructor() {
        super()
        this.state = {
            authed: Auth.isAuthed()
        }
    }

    componentDidMount() {

    }

    

    render() {
        return (
            <div className='dashboard'>
                <div className='container-fluid'>

                <div class="row">
                    <div class="col-md-2 sidebar">
                        <div className='container'>

                            <Navigation />
                            
                        </div>
                    </div>

                    <div class="col-md-10">
                        <div class="row content">
                            <div class="col-md-4">
                                <div className='container'>
                                    ...
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div className='container'>
                                    ...
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div className='container'>
                                    ...
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div className='container'>
                                    ...
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div className='container'>
                                    ...
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div className='container'>
                                    ...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        )
    }
}

export default Dashboard;