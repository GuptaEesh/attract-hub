import React from 'react'
import { WishCard } from '../'
export function WishCardGrey({ greyText, product }) {
    return (
        <div className="container">
            <p className="text-white overlay-text bolder size-12">{greyText}</p>
            <WishCard greyClass={true} product={product} />
        </div>
    )
}
