import { Footer, Header, ShoppingCart } from '@/components'
import React from 'react'

const Cart = () => {
    return (
        <>
            <Header />
            <div className="mt-44 overflow-x-hidden">
                <ShoppingCart />
            </div>
            <Footer />
        </>
    )
}

export default Cart