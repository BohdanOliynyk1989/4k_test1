import React, {useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const  data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data ', data)
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const  data = await request('/api/auth/login', 'POST', {...form})
            message(data.message)
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Адресна книга</h1>
                <div className="card #7986cb indigo lighten-2">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизація</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Введіть Email"
                                    id="email"
                                    type="text"
                                    className="yellow-input"
                                    name='email'
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введіть пароль"
                                    id="password"
                                    type="password"
                                    className="yellow-input"
                                    name='password'
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className='btn #66bb6a green lighten-1'
                            style={{marginRight: 40}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Вхід
                        </button>
                        <button
                            className='btn grey darken-1 black-text'
                            onClick={registerHandler}
                            disabled={loading}
                        >Реєстрація
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}