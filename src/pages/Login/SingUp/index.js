

import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../../assets/logo.png'
import { AuthContext } from '../../../context/auth';
import { toast } from 'react-toastify';

export const SingUpScreen = () => {

    const { singUp, loadingAuth } = useContext(AuthContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name !== '' && email !== '' && password !== '') {
            await singUp(email, password, name)
        }else{
            toast.error("Preencha todos os campos!")
        }
    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='Logo do sistema' />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar nova conta</h1>
                    <input type='text' placeholder='Seu nome' value={name} onChange={(text) => setName(text.target.value)} />
                    <input type='text' placeholder='email@email.com' value={email} onChange={(text) => setEmail(text.target.value)} />
                    <input type='password' placeholder='******' value={password} onChange={(text) => setPassword(text.target.value)} />

                    <button type='submit'>{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
                </form>

                <Link to="/">Já possuo uma conta!</Link>
            </div>
        </div>
    )
}