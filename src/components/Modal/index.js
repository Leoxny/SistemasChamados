import { FiX } from 'react-icons/fi'
import './style.css'

export const Modal = ({ conteudo, close }) => {
    return (
        <div className='modal'>
            <div className='container'>
                <button className='close' onClick={close}>
                    <FiX size={25} color='#fff' />
                    Fechar
                </button>
                <main>
                    <h2>Detalhes do chamado</h2>
                    <div className='row'>
                        <span>Cliente: <i>{conteudo.cliente}</i></span>
                    </div>

                    <div className='row'>
                        <span>Assunto: <i>{conteudo.assunto}</i></span>
                        <span>Cadastrado em: <i>{conteudo.createdFormat}</i></span>
                    </div>

                    <div className='row'>
                        <span>Status: <i className='status-badge' style={{color: "#fff", backgroundColor: conteudo.status === 'Aberto' ? '#5cb85c' : '#999'}}>{conteudo.status}</i></span>
                    </div>

                    <div className='row'>
                        <h3>Complmento</h3>
                        <p style={{opacity: conteudo.complemento !== '' ? 1 : 0.6}}>{conteudo.complemento !== '' ? conteudo.complemento : 'Sem descrição no chamado'}</p>
                    </div>
                </main>
            </div>
        </div>
    )
}