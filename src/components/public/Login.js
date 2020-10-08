import React from 'react';
import axios from 'axios';
import '../../css/App.css';
import {Form, Button} from 'react-bootstrap/';
import { BrowserRouter, Redirect } from 'react-router-dom'

const Auth = require('../helpers/checkAuth');

class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            authed: Auth.isAuthed(),
        }

        this.handleInput = this.handleInput.bind(this)
        this.login = this.login.bind(this)
        this.redirect = this.redirect.bind(this)
    }

    redirect() {
        if (this.state.authed) {
            window.location.href = "/dashboard";
        }
    }

    handleInput(e) {
        console.log(this.state)
        this.setState({
            loginDataError: false,
            loginError: false,
            [e.target.id]: e.target.value
        })
    }

    login(e) {
        e.preventDefault()
        if (this.state.email && this.state.password) {
            axios.post('http://localhost:5000/login', {email: this.state.email, password: this.state.password})
            .then(response => {
                if (response.data.token) {
                    this.setState({
                        authed: true
                    })
                    localStorage.setItem('user', JSON.stringify(response.data))
                } else {
                    this.setState({
                        loginError: true
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            this.setState({
                loginDataError: true
            })
        }
    }

    forgotPassword() {
        
    }

    render() {
        if (!this.state.authed) {
            return (
                <div className='login-form'>
                    <div className='container'>

                        <h2>TRACKER</h2>
                        
                        <Form>
                            
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={this.handleInput} style={ this.state.loginDataError ? {border: '1px solid red'} : {}} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.handleInput} style={ this.state.loginDataError ? {border: '1px solid red'} : {}} type="password" placeholder="Password" />
                            </Form.Group>

                            {this.state.loginError &&
                            <>
                            <p id='login-error' style={ this.state.loginError ? {display: 'block'} : {display: 'none'}}>Email or Password incorrect!</p>
                            <p>Forgot your password? Please click <a href=''>here</a>.</p>
                            </>
                            }
                            <Button onClick={this.login} variant="light" type="submit">
                                SUBMIT
                            </Button>

                        </Form>

                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Please wait while we redirect you</h1>
                    {this.redirect()}
                </div>
            )
        }
    }
}

export default Login;