import React, { useState, useEffect, createContext } from 'react';
import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const navigate = useNavigate()

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
                loadingAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}