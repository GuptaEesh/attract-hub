import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Input, MyToast } from '../../components/atomic'
import { PassChecker } from './pass-checker'
import { InputPass, InputSimple, Loader } from '../../components/composite'
import '../login/login.css'
import axios from 'axios'
import { useAuth } from '../../helpers/contexts/auth-context'

export function SignUp() {
    const initial = {
        name: '',
        email: '',
        password: '',
        confirmPass: '',
        error: false,
        message: '',
        loader: false,
    }
    const navigate = useNavigate()

    const { login, isAuthenticated } = useAuth()
    const [formFields, setFormFields] = useState(initial)
    const { name, email, password, confirmPass, error, message, loader } =
        formFields
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            if (password !== confirmPass) throw 'passwordError'
            setFormFields({ ...formFields, loader: true })
            const response = await axios.post('/api/auth/signup', {
                name,
                email,
                password,
            })
            setFormFields({ ...formFields, loader: false })
            login(response.data)
        } catch (err) {
            setFormFields({
                ...formFields,
                error: true,
                message:
                    err === 'passwordError'
                        ? "Passwords don't match"
                        : "It's not you it's us",
            })
            setTimeout(
                () => setFormFields({ ...formFields, error: false }),
                1500
            )
        }
    }
    useEffect(() => (isAuthenticated ? navigate('/') : ''), [isAuthenticated])
    return error ? (
        <div className="login-page flex flex-column">
            <MyToast message={message} alertType="danger-alert" />
        </div>
    ) : (
        <div
            className="login-page flex align-center flex-column justify-center"
            style={{ height: '100vh' }}
        >
            {loader ? (
                <div className="flex flex-column align-center">
                    <Loader />
                    <h2>Signing you in</h2>
                </div>
            ) : (
                <form
                    onSubmit={submitHandler}
                    className="flex glass flex-column"
                    style={{ gap: '10px', padding: '2rem' }}
                >
                    {' '}
                    <InputSimple
                        title="Name"
                        inputClass="input-text md"
                        inputPlaceHolder="type name..."
                        inputType="text"
                        inputValue={name}
                        inputFunc={(e) =>
                            setFormFields({
                                ...formFields,
                                name: e.target.value,
                            })
                        }
                    />
                    <InputSimple
                        title="Email"
                        inputClass="input-text md"
                        inputPlaceHolder="email..."
                        inputType="email"
                        inputValue={email}
                        inputFunc={(e) =>
                            setFormFields({
                                ...formFields,
                                email: e.target.value,
                            })
                        }
                    />
                    <InputPass
                        title="Password"
                        inputValue={password}
                        inputFunc={(e) =>
                            setFormFields({
                                ...formFields,
                                password: e.target.value,
                            })
                        }
                        inputClass="input-text md"
                        inputPlaceHolder="password..."
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"
                    />
                    <InputPass
                        title="Repeat Password"
                        inputValue={confirmPass}
                        inputFunc={(e) =>
                            setFormFields({
                                ...formFields,
                                confirmPass: e.target.value,
                            })
                        }
                        inputClass="input-text md"
                        inputPlaceHolder="confirm password.."
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"
                    />
                    <PassChecker pass={password} confirmPass={confirmPass} />
                    <span className="text-white">
                        Already a customer?
                        <br />{' '}
                        <Link to="/login">
                            <span className="text-underline text-blue sm">
                                Log in here &gt;
                            </span>
                        </Link>
                    </span>
                    <Input
                        inputType="submit"
                        inputClass="primary btn text-white without-shadow"
                    />
                </form>
            )}
        </div>
    )
}
