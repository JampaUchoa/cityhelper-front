import React, { useState } from 'react';

import './auth.scss';
import { Link, Redirect } from 'react-router-dom';
import { post } from 'utils/fetch';
import { getUserLogin, loginSuccess } from 'utils/user';

export default function Register() {
    const defaultForm = { userType: "student" };

    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
        defaultForm.userType = "invite"
        defaultForm.token = token
    }

    const [form, setForm] = useState(defaultForm)
    const [loggedIn, setLoggedIn] = useState(false)
    const [errors, setErrors] = useState([])

    const changeForm = (e) => {
        const updatedForm = { ...form, [e.target.name]: e.target.value };
        setForm(updatedForm);
    }

    const sendForm = async (e) => {
        e.preventDefault();
        try {
            await post("/api/auth/register/", form);
        }
        catch (e) {
            return setErrors(Object.values(e));
        }
        const { token } = await post("/api/auth/login/", { username: form.email, password: form.password });

        const success = await loginSuccess(token);

        if (success && token && form.userType === "organization") {
            await post("/api/organization/create/", { name: form.organization });
        }

        if (success) {
            setLoggedIn(true);
        }

    }

    if (loggedIn || getUserLogin()) {
        return (
            <Redirect to={"/dashboard"} />
        )
    }

    return (
        <div className="auth">
            <form className={`auth-box ${form.userType}`} onSubmit={sendForm}>
                <div className="img-container">
                    <img src={"https://aiboxlab.org/img/logo-aibox.png"} alt="" />
                </div>

                {form.userType !== "invite" ?
                    <div className="picker">
                        <h2>Cadastro para: </h2>
                        <div className="selector">
                            <label>
                                <input type="radio" name="userType" checked={form.userType === "student"} value="student" onChange={changeForm} />
                                <span>
                                    Aluno
                                </span>
                            </label>
                            <label>
                                <input disabled type="radio" name="userType" checked={form.userType === "organization"} value="organization" onChange={changeForm} />
                                <span title={"Em breve"} style={{ backgroundColor: "#CCC", color: "#777" }} >
                                    Escola
                                </span>
                            </label>
                        </div>

                    </div>
                    :
                    null
                }

                {form.userType ?
                    <>
                        <div className="org-divider">

                            <div className="user-info">

                                <div className="form-section">
                                    <label>
                                        Nome
                                    </label>
                                    <input autoComplete="name"
                                        name="name"
                                        type="text" required value={form.name} onChange={changeForm} />
                                </div>

                                <div className="form-section">
                                    <label>
                                        Email
                                    </label>
                                    <input autoComplete="username email"
                                        name="email"
                                        placeholder="" type="text" aria-label="email input"
                                        required value={form.email} onChange={changeForm} />
                                </div>

                                <div className="form-section">
                                    <label>
                                        Senha
                                    </label>
                                    <input autoComplete="new-password"
                                        aria-invalid="false" name="password"
                                        placeholder="" type="password"
                                        required className="" value={form.password} onChange={changeForm} />
                                </div>

                                {/* <div className="form-section">
                                    <label>
                                        Repetir senha
                                    </label>
                                    <input autoComplete="new-password"
                                        aria-invalid="false" name="passwordConfirm"
                                        placeholder="" type="password"
                                        required className="" value={form.passwordConfirm} onChange={changeForm} />
                                </div> */}
                            </div>

                            {form.userType === "organization"
                                ?
                                <div className="org-info">
                                    <div className="form-section">
                                        <label>
                                            Nome da escola
                                        </label>
                                        <input autoComplete="organization"
                                            aria-invalid="false" name="organization"
                                            placeholder="" type="text"
                                            required className="" value={form.organization} onChange={changeForm} />
                                    </div>

                                    {/* <div className="form-section">
                                <label>
                                    Ocupação
                                </label>
                                <input autoComplete="organization-title"
                                    aria-invalid="false" name="organizationRole"
                                    placeholder="" type="text"
                                    aria-required className="" value={form.organizationRole} onChange={changeForm} />
                            </div> */}

                                </div>

                                : null
                            }


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

                        <button className="main-btn" type="submit">
                            Criar Conta
                        </button>
                    </>
                    : null}


            </form>

            <div className="auth-switch">
                <Link to="/login"> Ja tem conta? </Link>
            </div>

        </div>
    )

}