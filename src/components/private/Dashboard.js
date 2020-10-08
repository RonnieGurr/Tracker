import React from 'react';
import Navigation from './Navigation';
import Chart from "chart.js";
import Axios from 'axios';

const Auth = require('../helpers/checkAuth');
const dbHelper = require('../helpers/Dashboard');

const apiUrl = 'http://localhost:5000'

class Dashboard extends React.Component {
    chartRef = React.createRef()

    constructor() {
        super()
        this.state = {
            authed: Auth.isAuthed(),
            loading: true
        }

        this.refreshToken = this.refreshToken.bind(this)
    }

    componentDidMount() {
        const token = JSON.parse(localStorage.getItem('user')).token
        Axios.post(`${apiUrl}/get-data`, {search: 'tags', data: 'dashboard'}, { headers: { 'authorization': `Bearer ${token}`  } })
        .then(response => {
            const userVisitData = response.data.map(element => {
                delete element._id
                delete element.__v 
                if (element.name === 'userVisit') return element
            })
            this.setState({
                dashboardData: {userVisitData: userVisitData},
                loading: false
            })
        }).catch(err => {
            this.refreshToken()
            console.log('-----SUGGESTIONS------\nNothing stored in data? \nNothing with the tag dashboard? \nDid the server just start or restart? try to refresh.')
        })
    }

    componentDidUpdate() {
        if (this.state.dashboardData) {
           let data = dbHelper.sortData(this.state.dashboardData)
           let sites = data.userVisitData.urls.map(element => element.url)
           let visits = data.userVisitData.urls.map(element => element.count)
        }
    }

    refreshToken() {
        console.log('logging back in') // Maybe alert the user?
        const token = JSON.parse(localStorage.getItem('user')).refreshToken
        Axios.post(`${apiUrl}/refresh-token`, {}, { headers: { 'authorization': `Bearer ${token}` }})
        .then(response => {
            const tokens = {token: response.data.token, refreshToken: JSON.parse(localStorage.getItem('user')).refreshToken}
            localStorage.setItem('user', JSON.stringify(tokens))
            this.componentDidMount()
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className='dashboard'>
                <div className='container-fluid'>

                <div className="row">
                    <div className="col-md-2 sidebar">
                        <div className='container'>

                            <Navigation />
                            
                        </div>
                    </div>

                    <div className="col-md-10">
                        <div className="row content">
                            <div className="col-md-4">
                                <div className='container'>
                                    {this.state.loading ? 'loading' :
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>URL</td>
                                                <td>NUM OF CLICKS</td>
                                            </tr>
                                            <tr>
                                                <td>https://google.com/</td>
                                                <td>624</td>
                                            </tr>
                                            <tr>
                                                <td>https://google.com/</td>
                                                <td>624</td>
                                            </tr>
                                            <tr>
                                                <td>https://google.com/</td>
                                                <td>624</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    }   
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className='container'>
                                    {this.state.loading && 'Loading'}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className='container'>
                                    {this.state.loading && 'Loading'}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className='container'>
                                    {this.state.loading && 'Loading'}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className='container'>
                                    {this.state.loading && 'Loading'}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className='container'>
                                    {this.state.loading && 'Loading'}
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