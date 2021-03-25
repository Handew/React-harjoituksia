import React, { useState } from 'react'
import './App.css'
import AuthService from './services/auth'
import md5 from 'md5'

const LoginForm = ({ currentUser, setCurrentUser }) => {
    // Login lomakkeen kenttiä vastaavat statet
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Näytetäänkö pelkkä komponentti vai nappi jonka takana komponentti aukeaa
    const [näytetäänkö, setNäytetäänkö] = useState(false)

    // Login napin painallus ajaa tämän:

    const authenticate = (event) => {
        event.preventDefault()

        const userForAuth = {
            username: userName,
            password: password

        }

        console.log(userForAuth)

        AuthService
            .authenticate(userForAuth)
            .then(response => {

                    // Selaimen localstorage saa avain-arvo parin kirjautuneelle käyttäjälle:
                    localStorage.setItem('user', response.userName)
                    localStorage.setItem('token', response.token)

                    // Asetetaan käyttäjä stateen
                    setCurrentUser(response.userName)
                    setNäytetäänkö(true)

            })
            .catch(error => {
                alert(error)
            })
    }

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    // Empty napin painallus ajaa tämän
    const emptyFields = () => {
        setPassword('')
        setUsername('')
    }

    if (!currentUser && näytetäänkö) {

        return (
            <>
                <form className="login-form" onSubmit={authenticate}>

                    <input className="login-input" value={userName} type="text" placeholder="Username" onChange={({ target }) => setUsername(target.value)} />

                    <input className="login-input" value={password} type="password" placeholder="password" onChange={({ target }) => setPassword(target.value)} />

                    <button id="nappi" type="submit">Login</button>

                    <button id="nappi"  onClick={emptyFields}>Empty</button>

                </form>


            </>
        )
    }

    else if (currentUser && näytetäänkö) {
        return (

            <div>
                <p>{`Logged in as ${currentUser}`}</p>
                <button id="nappi" onClick={logout}>LogOut</button>
            </div>
        )
    }

    else {
        return (

            <button id="nappi" onClick={() => setNäytetäänkö(true)}>Login</button>
        )
    }

}

export default LoginForm