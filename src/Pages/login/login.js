import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/atomic'
import { InputPass, InputSimple, Loader } from '../../components/composite'
import { AiFillWarning } from 'react-icons/ai'
import './login.css'
import { useAuth } from '../../helpers/contexts/auth-context'
import { loginHandler } from '../../helpers/utils'
export function Login() {
    const initial = {
        email: '',
        password: '',
        error: false,
        loader: false,
    }
    const { login } = useAuth()
    const [formFields, setFormFields] = useState(initial)
    const { email, password, error, loader } = formFields
    const guestLogin = () =>
        setFormFields({
            ...formFields,
            email: 'attractCustomer@gmail.com',
            password: 'attract/hub',
        })

    const submitHandler = (e) =>
        loginHandler(e, setFormFields, login, formFields)
    return (
        <div className="flex login-page align-center justify-center">
            {loader ? (
                <div className="flex flex-column align-center">
                    <Loader />
                    <h2>Logging you in</h2>
                </div>
            ) : (
                <form
                    onSubmit={submitHandler}
                    className=" flex glass flex-column text-white padding-2 gap-1"
                >
                    <InputSimple
                        title="Email"
                        inputType="email"
                        inputClass="input-text md"
                        inputValue={email}
                        inputFunc={(e) =>
                            setFormFields({
                                ...formFields,
                                email: e.target.value,
                            })
                        }
                        inputPlaceHolder="email..."
                    />
                    <InputPass
                        title="Password"
                        inputType="password"
                        inputClass="input-text md"
                        inputValue={password}
                        inputFunc={(e) =>
                            setFormFields({
                                ...formFields,
                                password: e.target.value,
                            })
                        }
                        inputPlaceHolder="password..."
                    />
                    {error ? (
                        <span className="flex align-center bold text-red">
                            Wrong Credentials{' '}
                            <AiFillWarning className="text-red" />
                        </span>
                    ) : (
                        <span style={{ opacity: 0 }}>Validate</span>
                    )}
                    <Button
                        btnType="btn guest-login secondary bold without-shadow"
                        btnText="Guest Login"
                        btnFunc={guestLogin}
                    />
                    <h2 className="flex flex-column text-white">
                        New Here?{' '}
                        <Link to="/signup">
                            <span className="sm register-link text-blue">
                                Register Here &gt;{' '}
                            </span>
                        </Link>
                    </h2>
                    <Button
                        btnType="btn primary bold without-shadow"
                        btnText="Login"
                    />
                </form>
            )}
        </div>
    )
}
