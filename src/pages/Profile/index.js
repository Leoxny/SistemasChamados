
import { useContext, useState } from 'react'
import './style.css'
import { Header } from '../../components/Header'
import { Title } from '../../components/Title'
import { FiSettings, FiUpload } from 'react-icons/fi'
import avatarImg from '../../assets/avatar.png'
import { AuthContext } from '../../context/auth'
import { toast } from 'react-toastify';
import { db, storage } from '../../services/firebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const ProfileScreen = () => {

    const { user, storageUser, setUser, logout } = useContext(AuthContext)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imagem, setImage] = useState(null)
    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)

    const handleFile = (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImage(image)
                setAvatarUrl(URL.createObjectURL(image))
            } else {
                toast.error("Envie uma imagem do tipo PNG ou JPEG")
                setImage(null)
                return
            }
        }
    }

    const hadleSubmit = async (e) => {
        e.preventDefault()

        if (imagem === null && nome !== '') {
            //Atualizar apenas o nome do user
            const docRef = doc(db, 'users', user.uid)
            await updateDoc(docRef, {
                nome: nome
            }) // o then e sempre chamado se tudo der certo e quando e uma promise
                .then(() => {
                    let data = {
                        ...user,
                        nome: nome
                    }
                    setUser(data)
                    storageUser(data)
                    toast.success("Atualizado com sucesso!")
                })
        } else if (nome !== '' && imagem !== null) {
            // Atualizar tanto nome quanto a foto
            handleUpload()
        }
    }

    const handleUpload = async () => {
        const currentUid = user.uid

        const updloadRef = ref(storage, `images/${currentUid}/${imagem.name}`)
        const updloadTaks = uploadBytes(updloadRef, imagem)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                    let urlFoto = downloadURL;

                    const docRef = doc(db, 'users', user.uid)
                    await updateDoc(docRef, {
                        avatarUrl: urlFoto,
                        nome: nome
                    })
                    .then(() => {
                        let data = {
                            ...user,
                            nome: nome,
                            avatarUrl: urlFoto
                        }
                        setUser(data)
                        storageUser(data)
                        toast.success("Atualizado com sucesso!")
                    })
                })
            })
    }

    return (
        <div>
            <Header />
            <div className='content'>
                <Title name="Minha conta">
                    <FiSettings size={25} />
                </Title>

                <div className='container' onSubmit={hadleSubmit}>
                    <form className='form-profile'>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#fff' size={25} />
                            </span>
                            <input type='file' accept='image/*' onChange={handleFile} /> <br />
                            {avatarUrl === null ?
                                <img src={avatarImg} alt='Foto de perfil' width={250} height={250} />
                                :
                                <img src={avatarUrl} alt='Foto de perfil' width={250} height={250} />
                            }
                        </label>

                        <label>Nome</label>
                        <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} />
                        <label>Email</label>
                        <input type='text' value={email} disabled={true} />

                        <button type='submit'>Salvar</button>
                    </form>
                </div>

                <div className='container'>
                    <button className='logout-btn' onClick={() => logout()}>Sair</button>
                </div>
            </div>

        </div>
    )
}