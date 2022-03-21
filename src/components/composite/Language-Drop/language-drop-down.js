import { useState } from 'react'
import { Button } from '../../atomic'
import './language-drop-down.css'
import React from 'react'
export function LanguageDrop() {
    const [visible, setVisibility] = useState(false)
    const languageSelectHandler = visible
        ? setTimeout(() => setVisibility(false), 2000)
        : () => setVisibility(true)
    return (
        <>
            <Button
                btnFunc={languageSelectHandler}
                btnType="btn secondary material-icons outlined"
                btnText="translate arrow_drop_down"
            />
            {visible && (
                <div className="language-menu flex flex-column">
                    <h2>English</h2>
                    <h2>Hindi</h2>
                </div>
            )}
        </>
    )
}
