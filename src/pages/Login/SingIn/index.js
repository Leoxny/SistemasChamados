
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../../assets/logo.png'
import { AuthContext } from '../../../context/auth';
import { toast } from 'react-toastify';

export const SingInScreen = () => {

    const { singIn, loadingAuth } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSingIn = async (e) => {
        e.preventDefault()

        if (email !== '' && password !== '') {
            await singIn(email, password)
        } else {
            toast.error("Preencha todos os campos!")
        }
    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='Logo do sistema' />
                </div>

                <form onSubmit={handleSingIn}>
                    <h1>Entrar</h1>
                    <input type='text' placeholder='email@email.com' value={email} onChange={(text) => setEmail(text.target.value)} />
                    <input type='password' placeholder='******' value={password} onChange={(text) => setPassword(text.target.value)} />

                    <button type='submit'>{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
                </form>

                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    )
}