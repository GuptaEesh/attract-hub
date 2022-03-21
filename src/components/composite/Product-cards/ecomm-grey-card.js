import { Card } from '../'
import React from 'react'
export function CardGrey({ greyText, product }) {
    return (
        <div className="container">
            <p className="text-white overlay-text bolder size-12">{greyText}</p>
            <Card greyClass={true} product={product} />
        </div>
    )
}
