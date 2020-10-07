import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'

function SideNavigation() {
    return (
        <>
        <h4 style={{paddingTop: '20px'}}>CORE</h4>
        
        <div className='side-nav-item'>
            <p>| DASHBOARD <FontAwesomeIcon icon={faTachometerAlt} /></p>
        </div>
        <div className='side-nav-item'>
            <p>| Link 2 <FontAwesomeIcon icon={faTachometerAlt} /></p>
        </div>
        <div className='side-nav-item'>
            <p>| Link 3 <FontAwesomeIcon icon={faTachometerAlt} /></p>
        </div>

        <h4 style={{paddingTop: '20px'}}>SETTINGS</h4>
        
        <div className='side-nav-item'>
            <p>| Link 1 <FontAwesomeIcon icon={faTachometerAlt} /></p>
        </div>
        <div className='side-nav-item'>
            <p>| Link 2 <FontAwesomeIcon icon={faTachometerAlt} /></p>
        </div>
        <div className='side-nav-item'>
            <p>| Link 3 <FontAwesomeIcon icon={faTachometerAlt} /></p>
        </div>
        </>
    )
}

export default SideNavigation;