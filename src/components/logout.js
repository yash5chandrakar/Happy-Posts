import React from 'react'
import { googleLogout } from '@react-oauth/google'

const Logout = (props) => {

    function handleLogOut() {
        console.log("LogOut Sucessful")
        googleLogout()
        props.setisLoggedIn(false)
    }

    return (
        <div className='buttonDiv'>
            <button id='signOutButton' onClick={() => handleLogOut()}>
                Logout
            </button>
        </div>

    )
}

export default Logout
