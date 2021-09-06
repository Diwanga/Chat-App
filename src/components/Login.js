import React from 'react'
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons'
import firebase from "firebase/app";

import { auth } from "../firebase"

function Login() {
    return (
        <div id="login-page">
            <div id="login-card">
                <h2>Welcome to chatty</h2>

                <div className="login-button google"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >

                    <GoogleOutlined /> Sign with Google

                </div>
                <br />  <br />
                <div className="login-button facebook"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                >
                    <FacebookOutlined /> Sign with Facebook

                </div>


            </div>
        </div>
    )
}

export default Login


//HTTPS=true npm start and it will take care of https on the localhost. The boolean HTTPS=true will be used to tell npm that it needs to start the https connection(for fb login in localhost)