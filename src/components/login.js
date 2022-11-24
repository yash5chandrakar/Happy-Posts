import React from 'react'
import { GoogleLogin } from '@react-oauth/google'

// const clientID = "883060251066-hnnpb706h4t1fpb9mo60es0onu69os9r.apps.googleusercontent.com"

const Login = (props) => {

    return (
        <div id='signInButton'>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    props.setisLoggedIn(true)
                    // console.log(credentialResponse);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </div>
    )
}

export default Login
