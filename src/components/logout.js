import React from 'react'
import { googleLogout } from '@react-oauth/google'

const Logout = (props) => {

    function handleLogOut() {
        console.log("LogOut Sucessful")
        googleLogout()
        props.setisLoggedIn(false)
    }

    return (
        <button id='signOutButton' onClick={() => handleLogOut()}>
            Logout
        </button>
    )
}

export default Logout
