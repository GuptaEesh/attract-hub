import React from 'react'
import '../login/login.css'
export function PassChecker({ pass, confirmPass }) {
    return (
        <div className="flex flex-column pass-checks-box">
            <h2 className="size-12">Password Checks</h2>
            {
                <p
                    className={
                        pass.match(/[0-9]/) || confirmPass.match(/[0-9]/)
                            ? ' condition-checked xsm'
                            : 'text-white bold  xsm'
                    }
                >
                    Need atleast one number
                </p>
            }
            {
                <p
                    className={
                        pass.match(/[a-z]/) || confirmPass.match(/[a-z]/)
                            ? ' condition-checked xsm'
                            : 'text-white bold  xsm'
                    }
                >
                    Need atleast one small alphabet
                </p>
            }
            {
                <p
                    className={
                        pass.match(/[A-Z]/) || confirmPass.match(/[A-Z]/)
                            ? ' condition-checked xsm'
                            : 'text-white bold  xsm'
                    }
                >
                    Need atleast one capital alphabet
                </p>
            }
            {
                <p
                    className={
                        pass.length >= 8 || confirmPass.length >= 8
                            ? ' condition-checked xsm'
                            : 'text-white bold  xsm'
                    }
                >
                    Atleast 8 characters long
                </p>
            }
            {
                <p
                    className={
                        pass.match(/[-’/`~!#*$@_%+=.,^&(){}[]|;:”<>?\\]/) ||
                        confirmPass.match(/[-’/`~!#*$@_%+=.,^&(){}[]|;:”<>?\\]/)
                            ? ' condition-checked xsm'
                            : 'text-white bold  xsm'
                    }
                >
                    Need atleast one special character
                </p>
            }
        </div>
    )
}
