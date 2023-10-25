import React, { useState, useEffect, createContext } from 'react';
import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        const storageUser = localStorage.getItem('tickets')

        if (storageUser) {
            setUser(JSON.parse(storageUser))
            setLoadingAuth(false)
        }

        setLoading(false)
    }

    const singIn = async (email, passowrd) => {
        setLoadingAuth(true)

        await signInWithEmailAndPassword(auth, email, passowrd)
            .then(async (value) => {

                let uid = value.user.uid

                const docRef = doc(db, 'users', uid)
                const docSnap = await getDoc(docRef)

                let data = {
                    uid: uid,
                    nome: docSnap.data().nome,
                    email: value.user.email,
                    avatarUrl: docSnap.data().avatarUrl
                }
                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success("Bem-vindo(a) de volta!")
                navigate("/dashboard")
            })
            .catch(error => {
                console.log(error)
                setLoadingAuth(false);
                toast.error("Ops algo deu errado!")
            })
    }

    const singUp = async (email, passowrd, name) => {
        try {

            setLoadingAuth(true)

            await createUserWithEmailAndPassword(auth, email, passowrd)
                .then(async (value) => {
                    let uid = value.user.uid

                    await setDoc(doc(db, "users", uid), {
                        nome: name,
                        avatarUrl: null
                    })
                        .then(() => {
                            let data = {
                                uid: uid,
                                nome: name,
                                email: value.user.email,
                                avatarUrl: null
                            }

                            setUser(data)
                            storageUser(data)
                            setLoadingAuth(false)
                            toast.success("Seja bem-vindo ao sistema!")
                            navigate("/dashboard")

                        })


                })
                .catch((erro) => {
                    console.error('ERRR', erro)
                    setLoadingAuth(false)
                })


        } catch (err) {
            console.log('Err', err)
            setLoadingAuth(false)
        }
    }

    const logout = async () => {
        await signOut(auth)
        localStorage.removeItem('tickets')
        setUser(null)
    }

    const storageUser = (data) => {
        localStorage.setItem("tickets", JSON.stringify(data))
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user, //transforma em bollean
                user,
                singIn,
                singUp,
                logout,
                loadingAuth,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}