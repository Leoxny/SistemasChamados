import { useState, useEffect, useContext } from 'react'
import './style.css'
import { Header } from '../../components/Header'
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from 'react-icons/fi'
import { Title } from '../../components/Title'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { format } from 'date-fns'
import { Modal } from '../../components/Modal'

const listRef = collection(db, "chamados")

export const DashboardScreen = () => {

    const [chamados, setChamados] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEmpty, setIsEmpty] = useState(false)
    const [lastDocs, setLastDocs] = useState()
    const [loadingMore, setLoadingMore] = useState(false)
    const [showPostModal, setPostModal] = useState(false)
    const [detail, setDetail] = useState()

    useEffect(() => {
        loadChamados()

        return () => { }
    }, [])

    const loadChamados = async () => {
        const q = query(listRef, orderBy('created', 'desc'), limit(5))

        const querySnapShot = await getDocs(q)
        setChamados([])
        await updateState(querySnapShot)
        setLoading(false)
    }

    const updateState = async (querySnapShot) => {
        const isCollection = querySnapShot.size === 0

        if (!isCollection) {
            let lista = []
            querySnapShot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            })

            const lastDosc = querySnapShot.docs[querySnapShot.docs.length - 1] //pegando o ultimo item
            //se tiver já chamado ele pega e adiciona a mais e busca os que nos adicionou a mais
            setChamados(chamados => [...chamados, ...lista])
            setLastDocs(lastDosc)

        } else {
            setIsEmpty(true)
        }

        setLoadingMore(false)
    }

    const handleMore = async () => {
        setLoadingMore(true);

        const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs), limit(5));
        const querySnapShot = await getDocs(q)
        await updateState(querySnapShot)

    }

    const toggleModal = (item) => {
        setPostModal(!showPostModal)
        setDetail(item)
    }

    if (loading) {
        return (
            <div>
                <Header />
                <div className='content'>
                    <Title name="Tickets">
                        <FiMessageSquare size={25} />
                    </Title>

                    <div className='container dashboard'>
                        <span>Buscando chamados...</span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Tickets">
                    <FiMessageSquare size={25} />
                </Title>

                <>
                    {chamados.length === 0 ?
                        <div className='container dashboard'>
                            <span>Nenhum chamado encontrado...</span>
                            <Link to="/new" className='new'><FiPlus size={25} color='#FFF' /> Novo Chamado</Link>

                        </div>
                        :
                        <>
                            <Link to="/new" className='new'><FiPlus size={25} color='#FFF' /> Novo Chamado</Link>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope='col'>Cliente</th>
                                        <th scope='col'>Assunto</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Cadastrado em</th>
                                        <th scope='col'>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chamados.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td data-label="Cliente">{item.cliente}</td>
                                                <td data-label="Assunto">{item.assunto}</td>
                                                <td data-label="Status">
                                                    <span className='badge' style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999' }}>{item.status}</span>
                                                </td>
                                                <td data-label="Cadastrado">{item.createdFormat}</td>
                                                <td data-label="#">
                                                    <button className='action' style={{ backgroundColor: '#3583f6' }} onClick={() => toggleModal(item)}>
                                                        <FiSearch color='#fff' size={17} />
                                                    </button>
                                                    <Link to={`/new/${item.id}`} className='action' style={{ backgroundColor: '#f6a935' }}>
                                                        <FiEdit2 color='#fff' size={17} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>

                            {loadingMore === true && <h3>Buscando mais chamados...</h3>}
                            {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Buscar mais</button>}

                        </>
                    }
                </>

            </div>

            {showPostModal && 
            <Modal 
                conteudo={detail}
                close={() => setPostModal(!showPostModal)}
            />}

        </div>
    )
}