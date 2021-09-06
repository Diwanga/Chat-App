
import React, { useRef, useState, useEffect } from "react"
import { LogoutOutlined } from '@ant-design/icons'

import axios from 'axios'
import { useHistory } from "react-router-dom"
import { ChatEngine } from 'react-chat-engine'

import { useAuth } from "../contexts/AuthContext"

import { auth } from "../firebase"

export default function Chats() {
    const didMountRef = useRef(false)
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        await auth.signOut()
        history.push("/")
    }

    async function getFile(url) {
        let response = await fetch(url);
        let data = await response.blob();
        return new File([data], "test.jpg", { type: 'image/jpeg' });
    }

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true

            if (!user || user === null) {
                history.push("/")
                return
            }

            // Get-or-Create should be in a Firebase Function
            axios.get(
                'https://api.chatengine.io/users/me/',
                {
                    headers: {
                        "project-id": 'd1e60ca3-12f2-44aa-b7e9-9358b29cfaab',
                        "user-name": user.email,
                        "user-secret": user.uid
                    }
                }
            )

                .then(() => setLoading(false))

                .catch(e => {
                    let formdata = new FormData()
                    formdata.append('email', user.email)
                    formdata.append('username', user.email)
                    formdata.append('secret', user.uid)

                    getFile(user.photoURL)
                        .then(avatar => {
                            formdata.append('avatar', avatar, avatar.name)

                            axios.post(
                                'https://api.chatengine.io/users/',
                                formdata,
                                { headers: { "private-key": "bfa92f40-5f46-4b2f-9132-1dbb066447e0" } }
                            )
                                .then(() => setLoading(false))
                                .catch(e => console.log('e', e.response))
                        })
                })


        }
    }, [user, history])


    if (!user || loading) return (
        <div>

            <div class="loader"></div>

        </div>)

    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    ChattY
                </div>

                <div onClick={handleLogout} className='logout-tab'>
                    <LogoutOutlined /> Logout
                </div>
            </div>

            <ChatEngine
                height='calc(100vh - 66px)'
                projectID='d1e60ca3-12f2-44aa-b7e9-9358b29cfaab'
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}



// import React from "react"

// import { useHistory } from "react-router-dom"
// import { ChatEngine } from 'react-chat-engine'

// import { auth } from "../firebase"

// export default function Chats() {
//     const history = useHistory()

//     async function handleLogout() {
//         await auth.signOut()
//         history.push("/")
//     }
//     console.log(auth)
//     return (

//         <div className='chats-page'>
//             <div className='nav-bar'>
//                 <div className='logo-tab'>
//                     Unichat
//                 </div>

//                 <div onClick={handleLogout} className='logout-tab'>
//                     Logout
//                 </div>
//             </div>

//             <ChatEngine
//                 height='calc(100vh - 66px)'
//                 projectID='1e60ca3-12f2-44aa-b7e9-9358b29cfaab'
//                 userName='.'
//                 userSecret='.'
//             />
//         </div>
//     )
// }