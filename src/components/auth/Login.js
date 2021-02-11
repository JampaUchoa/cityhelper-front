import React, { useState } from 'react';

import './auth.scss';
import { Link, Redirect } from 'react-router-dom';
import { post } from 'utils/fetch';
import { loginSuccess, getUserLogin } from 'utils/user';

export default function Login() {
    const [form, setForm] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [errors, setErrors] = useState([])

    const changeForm = (e) => {
        const updatedForm = { ...form, [e.target.name]: e.target.value };
        setForm(updatedForm);
    }

    const sendForm = async (e) => {
        try {
            const { token } = await post("/api/auth/login/", form);
            const success = await loginSuccess(token);
            if (success) {
                setLoggedIn(true);
            }
        } catch (e) {
            setErrors(Object.values(e));
        }
    }

    if (loggedIn || getUserLogin()) {
        window.location.pathname = "/dashboard"
        return (
            <Redirect to={"/dashboard"} />
        )
    }

    return (
        <div className="auth">
            <div className="auth-box">
                <div className="img-container">
                    <img src={"https://avatars.githubusercontent.com/u/13726064"} alt="" />
                </div>
                <h2 className="title">Acesse sua conta</h2>

                <div className="form-section">
                    <label>
                        Email
                    </label>
                    <input autoComplete="username email"
                        aria-invalid="false" id="email" name="username"
                        type="text" aria-label="email input"
                        aria-required="true" required="" className="" value={form.username} onChange={changeForm} />
                </div>

                <div className="form-section">
                    <label>
                        Senha
                    </label>
                    <input autoComplete="current-password"
                        aria-invalid="false" name="password"
                        type="password"
                        aria-required="true" required="" className="" value={form.password} onChange={changeForm} />
                </div>

                {
                    errors.length > 0 ?
                        <div className="error-box">
                            {errors.map(error => 
                            <div>
                                {error}
                            </div>
                            )}
                        </div>
                        :
                        null
                }

                <button className="main-btn" onClick={sendForm}>
                    Entrar
                </button>


            </div>

            <div className="auth-switch">
                <Link to="/criar-conta"> Não tem conta? Cadastre-se </Link>
            </div>

        </div>
    )

}