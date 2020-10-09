import React from 'react';
import Navigation from './Navigation';
import Chart from "chart.js";
import Axios from 'axios';

var uniqid = require('uniqid');
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
        this.loadData = this.loadData.bind(this)
        this.millisConversion = this.millisConversion.bind(this)
    }

    componentDidMount() {
        const token = JSON.parse(localStorage.getItem('user')).token
        Axios.post(`${apiUrl}/get-data`, {search: 'tags', data: 'dashboard'}, { headers: { 'authorization': `Bearer ${token}`  } })
        .then(response => {
            const userVisitData = response.data.filter(element => {
                delete element._id
                delete element.__v 
                if (element.name === 'userVisit') return element
            })
            const visitLengthData = response.data.filter(element => {
                delete element._id
                delete element.__v 
                if (element.name === 'visitLength') return element
            })
            this.setState({
                dashboardData: {userVisitData: userVisitData, visitLengthData: visitLengthData},
                loading: false
            }, () => this.loadData())
        }).catch(err => {
            this.refreshToken()
            console.log('-----SUGGESTIONS------\nNothing stored in data? \nNothing with the tag dashboard? \nDid the server just start or restart? try to refresh.')
        })
    }

    loadData() {
        if (this.state.dashboardData) {
            let userVisits = dbHelper.sortData(this.state.dashboardData, 'userVisit')
            let sites = userVisits.userVisitData.urls.map(element => element.url)
            let visits = userVisits.userVisitData.urls.map(element => element.count)

            let visitLength = dbHelper.sortData(this.state.dashboardData, 'visitLength')

            this.setState({
                dashboardDataSorted: {
                    userVisits: {sites: sites, visits: visits},
                    visitLength: {urls: visitLength.visitLength.urls, times: visitLength.visitLength.times}
                }
            })
         }
    }

    millisConversion(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds} mins`
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
                                            <tr id={uniqid()}>
                                                <td>URL</td>
                                                <td>NUM OF CLICKS</td>
                                            </tr>
                                            {this.state.dashboardDataSorted && 
                                                this.state.dashboardDataSorted.userVisits.sites.map((value, index) => {
                                                    const clicks = this.state.dashboardDataSorted.userVisits.visits[index]
                                                    return (
                                                        <tr key={uniqid()}>
                                                            <td><a href={value} target='_blank'>{value}</a></td>
                                                            <td>{clicks}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    }   
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className='container'>
                                    {this.state.loading ? 'Loading' :
                                    <table>
                                        <tbody>
                                            <tr id={uniqid()}>
                                                <td>URL</td>
                                                <td>VISIT LENGTH</td>
                                            </tr>
                                            {this.state.dashboardDataSorted && 
                                                this.state.dashboardDataSorted.visitLength.urls.map((value, index) => {
                                                    const times = this.state.dashboardDataSorted.visitLength.times[index]
                                                    return (
                                                        <tr key={uniqid()}>
                                                            <td><a href={value} target='_blank'>{value}</a></td>
                                                            <td>{this.millisConversion(times)}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
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
                        </div>
                    </div>
                </div>

                </div>
            </div>
        )
    }
}

export default Dashboard;