import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
const Auth = require('../helpers/checkAuth');

class Header extends React.Component {
    render() {
        return (
                <Navbar expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand>
                        TRACKER
                    </Navbar.Brand>
                </Navbar>
        )
    }
}

export default Header