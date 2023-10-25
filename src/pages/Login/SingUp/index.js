

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../../assets/logo.png'

export const SingUpScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='Logo do sistema' />
                </div>

                <form>
                    <h1>Cadastrar nova conta</h1>
                    <input type='text' placeholder='Seu nome' value={name} onChange={(text) => setName(text)} />
                    <input type='text' placeholder='email@email.com' value={email} onChange={(text) => setEmail(text)} />
                    <input type='password' placeholder='******' value={password} onChange={(text) => setPassword(text)} />

                    <button type='submit'>Cadastrar</button>
                </form>

                <Link to="/">Já possuo uma conta!</Link>
            </div>
        </div>
    )
}