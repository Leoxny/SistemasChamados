
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../../assets/logo.png'

export const SingInScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='Logo do sistema' />
                </div>

                <form>
                    <h1>Entrar</h1>
                    <input type='text' placeholder='email@email.com' value={email} onChange={(text) => setEmail(text)} />
                    <input type='password' placeholder='******' value={password} onChange={(text) => setPassword(text)} />

                    <button type='submit'>Acessar</button>
                </form>

                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    )
}