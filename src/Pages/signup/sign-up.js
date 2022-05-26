import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Input, MyToast } from '../../components/atomic'
import { PassChecker } from './pass-checker'
import { InputPass, InputSimple, Loader } from '../../components/composite'
import '../login/login.css'
import { useAuth } from '../../helpers/contexts/auth-context'
import { signUpHandler } from '../../helpers/utils'

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

    const { login } = useAuth()
    const [formFields, setFormFields] = useState(initial)
    const { name, email, password, confirmPass, error, message, loader } =
        formFields
    const submitHandler = (e) =>
        signUpHandler(e, setFormFields, login, formFields)
    return error ? (
        <div className="login-page flex flex-column">
            <MyToast message={message} alertType="danger-alert" />
        </div>
    ) : (
        <div className="login-page flex align-center flex-column justify-center height-r-100">
            {loader ? (
                <div className="flex flex-column align-center">
                    <Loader />
                    <h2>Signing you in</h2>
                </div>
            ) : (
                <form
                    onSubmit={submitHandler}
                    className="flex glass flex-column padding-2 gap-1"
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
